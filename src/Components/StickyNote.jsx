import React, { useRef, useEffect } from "react";
import { Group, Rect } from "react-konva";
import { Html } from 'react-konva-utils';
import { InputText } from "./Text/InputText";
import { Prong } from './Prong/Prong';
import { EngineContainer } from "./Pipeline/EngineContainer";
import { useState } from "react";


function eucDist (p1, p2) {
  if (p1.x && p2.x) {
  var xc = p2.x - p1.x
  var yc = p2.y - p1.y
  return {x: xc, y: yc};
  } else {
    return {x: 0, y: 0};
  }
}

export function StickyNote({
  x,
  y,
  text,
  width,
  height,
  prongs,
  engine,
  noteProps,
  layerRef,
  isSelected, 
  onSelect, 
  onChange,
  onGenerate,

  onReplace,
  onFilter,
  
  onTextClick,
  onDelete,
}) {
  const delBtnRf = useRef(null);
  const genBtnRf = useRef(null);
  const grpRef = useRef(null);
  const [pipelineButton, setPipelineButton] = useState(false);

  const [startCoord, setStartCoord] = useState({x: null, y: null});

  const encodePosition = (key) => {
    return (40*key)+40
  }
  const decodePosition = (pos) => {
    return 0.025*(pos-40)
  }
  
  const handleDragStart = (e) => {
    setStartCoord(e.target.position());
  }

  const handleDragEnd = (e) => {
    // coordinate change
    // **// distance = eucDist(startCoord, e.target.position());

    onChange({
      ...noteProps,
      x: e.target.position().x,
      y: e.target.position().y,
    });

    console.log("onChange",
    //...e.target.children.filter(child => child.getAttrs().className === "bulb"),
    e.target,

    // e.target.getAbsolutePosition(),
    layerRef.current.getIntersection(e.target.position()),
    // layerRef.current.getIntersection(e.target.getAbsolutePosition()),
//    bulbPositionShape.className,
//    bulbPositionShape.parent !== grpRef.current,
    grpRef.current
    );

    if (layerRef.current.getIntersection(e.target.position()) && 
    layerRef.current.getIntersection(e.target.position()).name().includes("note-container")) {
      var str = layerRef.current.getIntersection(e.target.position()).name();
      var contNum = parseInt(str.charAt(str.length-1));
      onChange({
        ...noteProps,
        x: e.target.position().x,
        y: e.target.position().y,
        container: contNum
      })
      console.log(
        contNum
        );
    }

    //check if there is anything on the bulb
    const bulb = e.target.children.filter(
      child => child.getAttrs().className === "bulb" 
      )[0].getAbsolutePosition();
    
    // look in the middle of the bulb
    const bulbPositionShape = layerRef.current.getIntersection({x:bulb.x+10, y:bulb.y+10});
    if (bulbPositionShape.getAttrs().className === 'prong') {
      console.log('Image', bulbPositionShape.parent.getAttrs().noteProps, grpRef.current);
      const bulbShapeProps = bulbPositionShape.parent.getAttrs().noteProps;
      const prongPos = decodePosition(bulbPositionShape.getAttrs().y);
      
      const newProngs = bulbShapeProps.prongs.map(obj => {
        if (obj.position === prongPos.toString()) {
          return {position: prongPos.toString(), text:text};
        } else {
          return obj;
        }
      });
      //console.log("nps", newProngs)
      //console.log("current group",grpRef.current);
      onReplace({...bulbShapeProps, text: bulbShapeProps.text.replace("[[input]]", text), prongs:newProngs});
      
      //console.log("bulb parnet", bulbPositionShape.parent);
      //console.log("current group",grpRef.current, noteProps);

      // setTimeout(() => {
      // onFilter(noteProps);
      // console.log("current group",grpRef.current);
      // }, 6000); // setnotes is slow

      // bulbPositionShape.parent.add(<Rect x={0} y={0} width={20} height={20} fill={"black"}/>);
      
      // grpRef.current.setAttr('draggable', false)
    }
  }

  

  return (
    <Group
        name={"text component"}
        x={x} 
        y={y} 
        noteProps={noteProps}
        // dragDistance={e => console.log("dragdist", e)}
        draggable
        ref={grpRef}
        // onDragStart={(e) => {
        //   console.log('start'+e.target.position().x);
        // }}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        // onDragStart={() => {
        //   console.log('hu');
        // }}
        onMouseOver={onSelect}
        >
        { pipelineButton && 
          <EngineContainer 
          width={width}
          height={height}

          engine={engine}
          engineSize={100}
          
          noteProps={noteProps}
          onReplace={onReplace}
          onGenerate={onGenerate}
          onChange={onChange}
          onTextClick={onTextClick}
          />
        }

        { isSelected &&
          <Html 
            class={"button"}
            innerRef={delBtnRf}
            groupProps={{ x: width-40, y: height*1.1+10 }} 
            divProps={{ style: { opacity: 0.63} }} >
            <button class="Delete-note-btn" onClick={onDelete} >Delete</button>
          </Html>
        }
        { (isSelected && !pipelineButton) &&
          <Html 
            class={"button"}
            innerRef={genBtnRf}
            groupProps={{ x: width-140, y: height*1.1+10 }} 
            divProps={{ style: { opacity: 0.83} }} >
            <button class="Add-note-btn" onClick={e => {setPipelineButton(true)}} >Add Engine</button>
          </Html>
        }
      {/* <Rect
        x={2}
        y={2}
        width={width}
        height={height + 2}
        fill={"#8900e1"}
        scaleX={isSelected ? 1.2 : 1}
        scaleY={isSelected ? 1.2 : 1}
        opacity={0.2}
        perfectDrawEnabled={false}
      /> */}
      
      <Rect
        className="container"
        x={isSelected ? 0 : 10}
        y={isSelected ? 0 : 20}
        width={width + 20}
        height={height + 20}
        fill={"#8900e1"}
        cornerRadius={4}
        perfectDrawEnabled={false}
        scaleX={isSelected ? 1.1 : 1}
        scaleY={isSelected ? 1.2 : 1}
        opacity={0.42}
        shadowColor="black"
        shadowBlur={pipelineButton ? 0 : 10}
        shadowOpacity={pipelineButton ? 0 : 0.3}
        shadowOffsetX={pipelineButton ? 0 : 10}
        shadowOffsetY={pipelineButton ? 0 : 10}
        //onMouseOver={onSelect}
        // do not put drag functions here
      />
      <InputText
        x={20}
        y={40}
        text={text}
        width={width}
        height={height}
        prongs={prongs}
        noteProps={noteProps}
        layerRef={layerRef}
        isSelected={isSelected}
        onTextClick={onTextClick}
        onChange={onChange}
      />
      {prongs.map((prong, index) => (
        <Prong
        y={encodePosition(prong.position)}
        key={index} 
        text={prong.text}
        visible={isSelected ? false : true} 
        />
      ))}
      <Rect 
        className={"bulb"}
        x={width*1.2-10}
        y={(height+20)*0.5+10}
        width={20}
        height={20}
        fill={"#8900e1"}
        cornerRadius={4}
        perfectDrawEnabled={false}
        opacity={1}
        shadowColor="black"
        visible={isSelected ? true : false} 
      />
      
    </Group>
  );
}
