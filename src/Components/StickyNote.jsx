import React, { useRef } from "react";
import { Group, Rect } from "react-konva";
import { Html } from 'react-konva-utils';
import { InputText } from "./Text/InputText";

export function StickyNote({
  x,
  y,
  text,
  width,
  height,
  noteProps,
  isSelected, 
  onSelect, 
  onChange,
  onTextClick,
  onDelete,
}) {
  const delBtnRf = useRef(null);
  
  const handleCoordChange = (e) => {
    onChange({
      ...noteProps,
      x: e.target.position().x,
      y: e.target.position().y,
    });
  }

  return (
    <div className="item">
    <Group
        className={"hello"}
        x={x} 
        y={y} 
        draggable
        // onDragStart={(e) => {
        //   console.log('start'+e.target.position().x);
        // }}
        onDragEnd={handleCoordChange}
        >
        { isSelected &&
          <Html 
            innerRef={delBtnRf}
            groupProps={{ x: width-40, y: height+10 }} 
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
      />
      <InputText
        x={20}
        y={40}
        text={text}
        width={width}
        height={height}
        noteProps={noteProps}
        isSelected={isSelected}
        onTextClick={onTextClick}
        onChange={onChange}
      />
    </Group>
    </div>
  );
}
