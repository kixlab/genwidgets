import React, { useRef, useState, useEffect } from "react";
import { Group, Rect, Text, Transformer  } from "react-konva";
import { EditableTextInput } from "./EditableTextInput";

function ResizableText({
  x,
  y,
  text,
  noteProps,
  isSelected,
  width,
  onChange,
  onClick,
  onDoubleClick
}) {
  const textRef = useRef(null);
  const transformerRef = useRef(null);

  useEffect(() => {
    if (isSelected && transformerRef.current !== null) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  function handleResize() {
    if (textRef.current !== null) {
      const textNode = textRef.current;
      const newWidth = textNode.width() * textNode.scaleX();
      const newHeight = textNode.height() * textNode.scaleY();
      textNode.scaleX(1);
      textNode.scaleY(1);
      textNode.setAttrs({
        width: Math.max(textNode.width() * textNode.scaleX(), 5),
        scaleX: 1,
        scaleY: 1,
      });
      onChange({
        ...noteProps,
        width: newWidth, 
      });
    }
  }


  const transformer = isSelected ? (
    <Transformer
      ref={transformerRef}
      padding= {5}
      // enable only side anchors
      enabledAnchors= {['middle-left', 'middle-right']}
      // limit transformer size
      boundBoxFunc= {(oldBox, newBox) => {
        if (newBox.width < 5) {
          return oldBox;
        }
        return newBox;
      }}
      rotateEnabled={false}
      flipEnabled={false}

    />
  ) : null;

  return (
    //<>
      <Text
        x={x}
        y={y}
        ref={textRef}
        text={text}
        fill="white"
        fontFamily="sans-serif"
        fontSize={24}
        perfectDrawEnabled={false}
        //onTransform={handleResize}
        onClick={onClick}
        onTap={onClick}
        onDblClick={onDoubleClick}
        onDblTap={onDoubleClick}
        width={width}
        draggable={false}
        // onDragStart={onDragStart}
        // onDragEnd={onDragEnd}        
      />
      //{transformer}
    //</>
  );
}


const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

function EditableText({
  x,
  y,
  text,
  width,
  height,
  noteProps,
  isEditing,
  isTransforming,
  onToggleEdit,
  onToggleTransform,
  onChange,
  //onResize
}) {
  function handleEscapeKeys(e) {
    if ((e.keyCode === RETURN_KEY && !e.shiftKey) || e.keyCode === ESCAPE_KEY) {
      onToggleEdit(e);
    }
  }

  const handleTextChange = (e) => {
    onChange({
      ...noteProps,
      text: e.currentTarget.value,
    });
  }

  if (isEditing) {
    return (
      <EditableTextInput
        x={x}
        y={y}
        width={width}
        height={height}
        value={text}
        noteProps={noteProps}
        onChange={handleTextChange}
        onKeyDown={handleEscapeKeys}
      />
    );
  }
  return (
    <ResizableText
      x={x}
      y={y}
      isSelected={isTransforming}
      onClick={onToggleTransform}
      onDoubleClick={onToggleEdit}
      //onResize={onResize}
      onChange={onChange}
      text={text}
      width={width}
      noteProps={noteProps}
    />
  );
}


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

  // onTextResize,
  // onTextChange,
  onTextClick
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);

  useEffect(() => {
    if (!isSelected && isEditing) {
      setIsEditing(false);
    } else if (!isSelected && isTransforming) {
      setIsTransforming(false);
    }
  }, [isSelected, isEditing, isTransforming]);

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
        x={x} 
        y={y} 
        draggable
        >
      <Rect
        x={20}
        y={20}
        width={width}
        height={height + 40}
        fill={"#8900e1"}
        scaleX={isSelected ? 1.2 : 1}
        scaleY={isSelected ? 1.2 : 1}
        perfectDrawEnabled={false}
      />
      <Rect
        x={0}
        y={0}
        width={width + 40}
        height={height + 60}
        fill={"#8900e1"}
        perfectDrawEnabled={false}
        onClick={onSelect}
        scaleX={isSelected ? 1.2 : 1}
        scaleY={isSelected ? 1.2 : 1}
        onTap={onSelect}
      />
      <EditableText
        x={20}
        y={40}
        text={text}
        width={width}
        height={height}
        noteProps={noteProps}
        //onResize={onTextResize}
        isEditing={isEditing}
        isTransforming={isTransforming}
        onToggleEdit={toggleEdit}
        onToggleTransform={toggleTransforming}
        onChange={onChange}
        //onChange={onTextChange}
      />
    </Group>
  );
}
