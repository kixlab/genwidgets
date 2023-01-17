import React, { useRef, useEffect } from "react";
import { Group, Rect } from "react-konva";
import { Html } from 'react-konva-utils';
import { InputText } from "./Text/InputText";
import { ProngImage } from './Prong/ProngImage';

export function StickyNote({
  x,
  y,
  text,
  width,
  height,
  prongs,
  noteProps,
  layerRef,
  isSelected, 
  onSelect, 
  onChange,
  onTextClick,
  onDelete,
}) {
  const delBtnRf = useRef(null);
  const grpRef = useRef(null);
  
  const handleCoordChange = (e) => {
    // coordinate change
    onChange({
      ...noteProps,
      x: e.target.position().x,
      y: e.target.position().y,
    });
    //check if there is anything on the bulb
    const bulb = e.target.children.filter(
      child => child.getAttrs().className === "bulb" 
      )[0].getAbsolutePosition();
    const bulbPositionShape = layerRef.current.getIntersection({x:bulb.x+10, y:bulb.y+10});
    if (bulbPositionShape.getAttrs().className === 'prong') {
      console.log('Image', bulbPositionShape.parent);
      // bulbPositionShape.parent.add(<Rect x={0} y={0} width={20} height={20} fill={"black"}/>);
      console.log(bulbPositionShape.parent);
      // grpRef.current.setAttr('draggable', false)
    }

    console.log("onChange",
    //...e.target.children.filter(child => child.getAttrs().className === "bulb"),
    // e.target.position(),
    // e.target.getAbsolutePosition(),
    // layerRef.current.getIntersection(e.target.position()),
    // layerRef.current.getIntersection(e.target.getAbsolutePosition()),
//    bulbPositionShape.className,
//    bulbPositionShape.parent !== grpRef.current,
    grpRef.current
    );
  }

  return (
    <div className="item">
    <Group
        className={"hello"}
        x={x} 
        y={y} 
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
        { isSelected &&
          <Html 
            class={"button"}
            innerRef={delBtnRf}
            groupProps={{ x: width-40, y: height*1.1+10 }} 
            divProps={{ style: { opacity: 0.63} }} >
            <button class="Delete-note-btn" onClick={onDelete} >Delete</button>
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
      {prongs.map((pos, index) => (
        <ProngImage 
        y={40+pos.position*40}
        key={index} 
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
