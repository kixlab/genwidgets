import { Text } from 'react-konva';
import React, { useState, useEffect, useRef } from 'react';
import { ProngImage } from './ProngImage';
import { TextEditor } from "./TextEditor";
import { TextResizer } from "./TextResizer";

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

export const InputText = ({
    x,
    y,
    text,
    width,
    height,
    noteProps,
    isSelected,
    onTextClick,
    onChange
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const textRef = useRef(null);
  const [prongInputPos, setProngInputpos] = useState([]);

  // change color of [[input]] using effect
  useEffect(() => {
    const text = textRef.current;
    Object.entries(text.textArr).map(([key, value]) => {
        if (value.text.includes('[[input]]') && !prongInputPos.includes(key)) {
            const posL = prongInputPos.slice();
            posL.push(key);
            setProngInputpos(posL);
        // console.log(`${key}: ${value.text.split(' ')}`, prongInputPos.includes(key));
        } else if (!value.text.includes('[[input]]') && prongInputPos.includes(key)) {
            setProngInputpos(prongInputPos.filter(pos => pos !== key))
            // console.log(prongInputPos);
        }
    });
    // adjust height function - to be written
  }, [noteProps]);

  useEffect(() => {
    if (!isSelected && isEditing) {
      setIsEditing(false);
    } else if (!isSelected && isTransforming) {
      setIsTransforming(false);
    }
    if (isEditing && isTransforming) {
      setIsTransforming(false);
    }
    console.log("isEditing",isEditing,"isTransforming",isTransforming)
  }, [isSelected, isEditing, isTransforming]);

  function toggleEdit() {
    setIsEditing(true);
    setIsTransforming(false);
    onTextClick();
  }

  function toggleTransform() {
    setIsTransforming(true);
    setIsEditing(false);
    onTextClick();
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


  return (
    <>
    <Text
        x={x}
        y={y}
        ref={textRef}
        text={text}
        width={width}
        
        onClick={toggleTransform}
        onTap={toggleTransform}
        onDblClick={toggleEdit}
        onDblTap={toggleEdit}// more methods
        visible={!isEditing && !isTransforming}

        fill={'#ffffff'}
        fontFamily={'sans-serif'}
        perfectDrawEnabled={false}
        fontSize={16}
      />
      {isEditing && (
          <TextEditor
            x={x}
            y={y}
            width={width}
            height={height}
            value={text}
            textNodeRef={textRef}
            onChange={handleTextChange}
            onKeyDown={handleEscapeKeys}
            onBlur={() => {
              setIsEditing(false);
            }}
          />
      )}
      {isTransforming && (
          <TextResizer
          x={x}
          y={y}
          isSelected={isTransforming}
          onClick={toggleTransform}
          onDoubleClick={toggleEdit}
          onResize={handleTextResize}
          text={text}
          width={width}
        />
      )}
      {prongInputPos.map((pos, index) => (
              <ProngImage 
              y={40+pos*40} 
              key={index} 
              visible={isSelected ? false : true} 
              />
      ))}
</>
  );
}
