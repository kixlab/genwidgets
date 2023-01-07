import React, { useRef, useState, useEffect } from "react";
import { Group, Rect, Text, Image } from "react-konva";
import { Html } from 'react-konva-utils';
import useImage from 'use-image';
import { TextEditor } from "./TextEditor";
import { TextResizer } from "./TextResizer";
import { InputText } from "./InputText";

const prong = "https://konvajs.org/assets/yoda.jpg";

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

// const URLImage = (url) => {
//   const [image] = useImage(url);
//   return (
//   <Image 
//     x={100}
//     y={100}
//     width={100}
//     height={100}
//     image={image}
//   />
//   )};

const URLImage = ({ url, ...rest }) => {
  const [image] = useImage(url);
  return <Image image={image} {...rest} />;
};


export function StickyNote({
  x,
  y,
  text,
  width,
  height,
  noteProps,
  stageScale,
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
  const [isTransforming, setIsTransforming] = useState(false);
  const textRef = useRef(null);
  const delBtnRf = useRef(null);
  const ref = useRef(null);

  const images = [
    "https://user-images.githubusercontent.com/67339217/210928088-442ca3f8-9e6b-4918-93e3-f06932771d29.svg",
  ];

  // useEffect(() => {
  //   console.log('className 👉️', ref.current.className);
  // }, []);

  useEffect(() => {
    if (!isSelected && isEditing) {
      setIsEditing(false);
    } else if (!isSelected && isTransforming) {
      setIsTransforming(false);
    }
  }, [isSelected, isEditing, isTransforming]);

  function toggleEdit() {
    setIsEditing(!isEditing);
    setIsTransforming(!isTransforming);
    onTextClick();
  }

  function toggleTransform() {
    setIsTransforming(!isTransforming);
    setIsEditing(!isEditing);
    onTextClick();
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

  const handleTextResize = (newWidth, newHeight) => {
    onChange({
      ...noteProps,
      width: newWidth,
      height: newHeight
    });
  }
  
  function handleEscapeKeys(e) {
    if ((e.keyCode === RETURN_KEY && !e.shiftKey) || e.keyCode === ESCAPE_KEY) {
      toggleEdit(e);
    }
  }
  
  // const TextChurn = () => {
  //   if (isEditing) {
  //     return (
  //       <TextEditor
  //           x={20}
  //           y={40}
  //           width={width}
  //           height={height}
  //           value={text}
  //           // textNodeRef={textRef}
  //           onChange={handleTextChange}
  //           onKeyUp={handleEscapeKeys}
  //           onKeyDown={handleEscapeKeys}
  //           onBlur={() => {
  //             setIsEditing(false);
  //           }}
  //           // onClick={toggleTransform}
  //           onDoubleClick={toggleTransform}
  //         />
  //     );
  //   } else if (isTransforming) {
  //     return (
  //       <TextResizer
  //         x={20}
  //         y={40}
  //         isSelected={isTransforming}
  //         // onClick={toggleTransform}
  //         onDoubleClick={toggleEdit}
  //         onResize={handleTextResize}
  //         text={text}
  //         width={width}
  //       />
  //     );
  //   } 
  // }

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
            groupProps={{ x: width-40 , y: height+10}} 
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
      {images.map((url, i) => (
              <URLImage url={url} x={-48} y={40+i*20} key={i} visible={isSelected ? false : true} />
            ))}
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
        noteProps={noteProps}
        width={width}
        onClick={toggleTransform}
        onDblClick={toggleEdit}// more methods
        visible={!isEditing && !isTransforming}
        stageScale={stageScale}
        // fill={'#ffffff'}
        // fontFamily={'sans-serif'}
        // perfectDrawEnabled={false}
        // fontSize={16}
      />
      {isEditing && (
          <TextEditor
            x={20}
            y={40}
            width={width}
            height={height}
            value={text}
            textNodeRef={textRef}
            onChange={handleTextChange}
            onKeyUp={handleEscapeKeys}
            onKeyDown={handleEscapeKeys}
            onBlur={() => {
              setIsEditing(false);
            }}
            // onClick={toggleTransform}
            // onDoubleClick={toggleEdit}
          />
      )}
      {isTransforming && (
          <TextResizer
          x={20}
          y={40}
          isSelected={isTransforming}
          onClick={toggleTransform}
          onDoubleClick={toggleEdit}
          onResize={handleTextResize}
          text={text}
          width={width}
        />
        
      )}
    </Group>
    </div>
  );
}
