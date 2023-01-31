import React, { useRef, useEffect } from "react";
import { Group, Rect } from "react-konva";
import { Html } from 'react-konva-utils';
import { InputText } from "./Text/InputText";
import { Prong } from './Prong/Prong';
import { EngineContainer } from "./Pipeline/EngineContainer";


export function StickyNote({
  x,
  y,
  text,
  width,
  height,
  prongs,
  engines,
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

  const encodePosition = (key) => {
    return (40*key)+40
  }
  const decodePosition = (pos) => {
    return 0.025*(pos-40)
  }
  
  const handleCoordChange = (e) => {
    // coordinate change
    onChange({
      ...noteProps,
      x: e.target.position().x,
      y: e.target.position().y,
    });

    console.log("onChange",
    //...e.target.children.filter(child => child.getAttrs().className === "bulb"),
    e.target,
    // e.target.getAbsolutePosition(),
    // layerRef.current.getIntersection(e.target.position()),
    // layerRef.current.getIntersection(e.target.getAbsolutePosition()),
//    bulbPositionShape.className,
//    bulbPositionShape.parent !== grpRef.current,
    grpRef.current
    );

    //check if there is anything on the bulb
    const bulb = e.target.children.filter(
      child => child.getAttrs().className === "bulb" 
      )[0].getAbsolutePosition();
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
    <div className="item">
    <Group
        name={"text component"}
        x={x} 
        y={y} 
        noteProps={noteProps}
        draggable
        ref={grpRef}
        // onDragStart={(e) => {
        //   console.log('start'+e.target.position().x);
        // }}
        onDragEnd={handleCoordChange}
        // onDragStart={() => {
        //   console.log('hu');
        // }}
        >
        <EngineContainer 
        width={width}
        height={height}
        engineSize={100}
        />
        { isSelected &&
          <Html 
            class={"button"}
            innerRef={delBtnRf}
            groupProps={{ x: width-40, y: height*1.1+10 }} 
            divProps={{ style: { opacity: 0.63} }} >
            <button class="Delete-note-btn" onClick={onDelete} >Delete</button>
          </Html>
        }
        { isSelected &&
          <Html 
            class={"button"}
            innerRef={genBtnRf}
            groupProps={{ x: width-140, y: height*1.1+10 }} 
            divProps={{ style: { opacity: 0.63} }} >
            <button class="Delete-note-btn" onClick={onGenerate} >Generate</button>
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
        shadowBlur={10}
        shadowOpacity={0.3}
        shadowOffsetX={10}
        shadowOffsetY={10}
        onMouseOver={onSelect}
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
    </div>
  );
}
