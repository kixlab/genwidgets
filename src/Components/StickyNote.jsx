import React, { useRef, useState, useEffect } from "react";
import { Group, Rect, Text } from "react-konva";
import { Html } from 'react-konva-utils';
import { TextEditor } from "./TextEditor"

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

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
  //isDragged,

  // onDragStart,
  // onDragEnd,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef(null);
  const delBtnRf = useRef(null);
  const ref = useRef(null);

  // useEffect(() => {
  //   console.log('className 👉️', ref.current.className);
  // }, []);

  useEffect(() => {
    if (!isSelected && isEditing) {
      setIsEditing(false);
    } 
  }, [isSelected, isEditing]);

  function toggleEdit() {
    setIsEditing(!isEditing);
    onTextClick(!isEditing);
  }
  
  const handleCoordChange = (e) => {
    onChange({
      ...noteProps,
      x: e.target.position().x,
      y: e.target.position().y,
    });
  }

  const handleTextChange = (e) => {
    onChange({
      ...noteProps,
      text: e.currentTarget.value,
    });
  }
  
  function handleEscapeKeys(e) {
    if ((e.keyCode === RETURN_KEY && !e.shiftKey) || e.keyCode === ESCAPE_KEY) {
      toggleEdit(e);
    }
  }
  

  return (
    <div className="item" >
    <Group
        className={"hello"}
        ref={ref}
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
            groupProps={{ x: 160, y: 220}} 
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
      <Text
        x={20}
        y={40}
        text={text}
        fill={'#ffffff'}
        fontFamily={'sans-serif'}
        perfectDrawEnabled={false}
        fontSize={18}
        ref={textRef}
        width={width}
        onClick={() => {
          setIsEditing(true);
          onTextClick(); // fix text bug
        }}
        visible={!isEditing}
      />
      {isEditing && (
          <TextEditor
            x={20}
            y={40}
            value={text}
            textNodeRef={textRef}
            width={width}
            height={height}
            onChange={handleTextChange}
            onKeyUp={handleEscapeKeys}
            onKeyDown={handleEscapeKeys}
            onBlur={() => {
              setIsEditing(false);
            }}
          />
      )}
    </Group>
    </div>
  );
}
