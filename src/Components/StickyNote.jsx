import React, { useState, useEffect } from "react";
import { Group, Rect } from "react-konva";
import { EditableText } from "./EditableText";

export function StickyNote({
  key,
  colour,
  text,
  x,
  y,
  isDragging,
  onDragStart,
  onDragEnd,
  width,
  height,
  onClick,
  onTextResize,
  onTextChange,
  selected,
  onTextClick
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);

  useEffect(() => {
    if (!selected && isEditing) {
      setIsEditing(false);
    } else if (!selected && isTransforming) {
      setIsTransforming(false);
    }
  }, [selected, isEditing, isTransforming]);

  function toggleEdit() {
    setIsEditing(!isEditing);
    onTextClick(!isEditing);
  }

  function toggleTransforming() {
    setIsTransforming(!isTransforming);
    onTextClick(!isTransforming);
  }

  return (
    <Group 
        key={key}
        x={x} 
        y={y} 
        draggable
        onDragEnd = {onDragEnd}
        onDragStart = {onDragStart}
        >
      <Rect
        x={20}
        y={20}
        width={width}
        height={height + 40}
        fill={colour}
        scaleX={isDragging ? 1.2 : 1}
        scaleY={isDragging ? 1.2 : 1}
        perfectDrawEnabled={false}
      />
      <Rect
        x={0}
        y={0}
        width={width + 40}
        height={height + 60}
        fill={colour}
        perfectDrawEnabled={false}
        onClick={onClick}
        scaleX={isDragging ? 1.2 : 1}
        scaleY={isDragging ? 1.2 : 1}
        onTap={onClick}
      />
      <EditableText
        x={20}
        y={40}
        text={text}
        width={width}
        height={height}
        onResize={onTextResize}
        isEditing={isEditing}
        isTransforming={isTransforming}
        onToggleEdit={toggleEdit}
        onToggleTransform={toggleTransforming}
        onChange={onTextChange}
      />
    </Group>
  );
}
