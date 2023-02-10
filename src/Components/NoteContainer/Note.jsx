import React, { useRef, useEffect } from "react";
import { Group, Rect, Text } from "react-konva";
import { Html } from 'react-konva-utils';
// import { InputText } from "../Text/InputText";
// import { Prong } from '../Prong/Prong';
// import { EngineContainer } from "../Pipeline/EngineContainer";
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

export function Note({
  x,
  y,
  text,
  width,
  height,
  // prongs,
  noteProps,
  layerRef,
  onNoteChange,
  toggleDrag,
  // isSelected, 
  // onSelect, 
  // onChange,
  // onReplace,
  
  // onTextClick,
  // onDelete,
}) {
  const delBtnRf = useRef(null);
  const grpRef = useRef(null);
  const textRef = useRef(null);

  const [startCoord, setStartCoord] = useState({x: null, y: null});

  // const encodePosition = (key) => {
  //   return (40*key)+40
  // }
  // const decodePosition = (pos) => {
  //   return 0.025*(pos-40)
  // }
  
  const handleDragStart = (e) => {
    toggleDrag(false);
    setStartCoord(e.target.position());
  }

  const handleDragEnd = (e) => {
    // coordinate change
    // **// distance = eucDist(startCoord, e.target.position());
    console.log(eucDist(startCoord, e.target.position()));
    setTimeout(() => {
      toggleDrag(true);
    }, 100);
    
    onNoteChange({
      ...noteProps,
      x: startCoord.x,
      y: startCoord.y,
    });

    // onNoteChange({
    //   ...noteProps,
    //   x: e.target.position().x,
    //   y: e.target.position().y,
    // });

    // console.log("onChange",
    // //...e.target.children.filter(child => child.getAttrs().className === "bulb"),
    // e.target,
    // grpRef.current
    // );

    //check if there is anything on the bulb
    // const bulb = e.target.children.filter(
    //   child => child.getAttrs().className === "bulb" 
    //   )[0].getAbsolutePosition();
    // const bulbPositionShape = layerRef.current.getIntersection({x:bulb.x+10, y:bulb.y+10});
    // if (bulbPositionShape.getAttrs().className === 'prong') {
    //   console.log('Image', bulbPositionShape.parent.getAttrs().noteProps, grpRef.current);
    //   const bulbShapeProps = bulbPositionShape.parent.getAttrs().noteProps;
    //   const prongPos = decodePosition(bulbPositionShape.getAttrs().y);
      
    //   const newProngs = bulbShapeProps.prongs.map(obj => {
    //     if (obj.position === prongPos.toString()) {
    //       return {position: prongPos.toString(), text:text};
    //     } else {
    //       return obj;
    //     }
    //   });
    //   //console.log("nps", newProngs)
    //   //console.log("current group",grpRef.current);
    //   onReplace({...bulbShapeProps, text: bulbShapeProps.text.replace("[[input]]", text), prongs:newProngs});
    // }
  }

  

  return (
    <Group
        name={"container note"}
        x={x} 
        y={y} 
        noteProps={noteProps}
        // dragDistance={e => console.log("dragdist", e)}
        draggable
        ref={grpRef}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        // onMouseOver={onSelect}
        >

        {/* { isSelected &&
          <Html 
            class={"button"}
            innerRef={delBtnRf}
            groupProps={{ x: width-40, y: height*1.1+10 }} 
            divProps={{ style: { opacity: 0.63} }} >
            <button class="Delete-note-btn" onClick={onDelete} >Delete</button>
          </Html>
        } */}
      <Rect

        // x={isSelected ? 0 : 10}
        // y={isSelected ? 0 : 20}
        x={0}
        y={0}
        width={width + 20}
        height={height + 20}
        fill={"#8900e1"}
        cornerRadius={4}
        perfectDrawEnabled={false}
        // scaleX={isSelected ? 1.1 : 1}
        // scaleY={isSelected ? 1.2 : 1}
        opacity={0.42}
        // shadowColor="black"
        // shadowBlur={pipelineButton ? 0 : 10}
        // shadowOpacity={pipelineButton ? 0 : 0.3}
        // shadowOffsetX={pipelineButton ? 0 : 10}
        // shadowOffsetY={pipelineButton ? 0 : 10}
      />
      <Text //InputText
        x={20}
        y={20}
        text={text}
        width={width-20}
        height={height}
        ref={textRef} 
        // prongs={prongs}
        // noteProps={noteProps}
        // layerRef={layerRef}
        // isSelected={isSelected}
        // onTextClick={onTextClick}
        // onChange={onChange}
        fill={'#ffffff'}
        fontFamily={'sans-serif'}
        perfectDrawEnabled={false}
        fontSize={16}
      />
      {/* {prongs.map((prong, index) => (
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
      /> */}
    </Group>
  );
}
