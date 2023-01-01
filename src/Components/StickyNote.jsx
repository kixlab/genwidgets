import React, { useRef, useState, useEffect } from "react";
import { Group, Rect, Text } from "react-konva";
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
}) {
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (!isSelected && isEditing) {
      setIsEditing(false);
    } 
  }, [isSelected, isEditing]);

  function toggleEdit() {
    setIsEditing(!isEditing);
    onTextClick(!isEditing);
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
    <Group 
        x={x} 
        y={y} 
        draggable
        >
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
        perfectDrawEnabled={false}
        onClick={onSelect}
        scaleX={isSelected ? 1.1 : 1}
        scaleY={isSelected ? 1.2 : 1}
        opacity={0.42}
        onTap={onSelect}
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
        }}
        onDblClick={onSelect}
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
  );
}
