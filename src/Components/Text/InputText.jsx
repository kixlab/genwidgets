import { Text } from 'react-konva';
import React, { useState, useEffect, useRef } from 'react';

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
    prongs,
    noteProps,
    layerRef,
    isSelected,
    onTextClick,
    onChange
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const textRef = useRef(null);

  // change color of [[input]] using effect
  // useEffect(() => {
  //   const text = textRef.current.text();
  //   const words = text.split(' ');
  //   const newWords = words.map((word) => {
  //     if (word === '[[input]]') {
  //       return (
  //         <span style= "colour:red" >
  //           {word}
  //         </span>
  //       );
  //     }
  //     return word;
  //   });
  //   onChange({
  //     ...noteProps,
  //     text: newWords.join(' '),
  //   });
  // }, [noteProps.text]);

  useEffect(() => {
    const text = textRef.current;
    Object.entries(text.textArr).map(([key, value]) => {
        const prongPos = prongs.map(obj => obj.position)
        if (value.text.includes('[[input]]') && !prongPos.includes(key)) {
            const posL = prongs.slice();
            posL.push({position:key, text:''});
            onChange({
              ...noteProps,
              prongs: posL,
            });
        // console.log(`${key}: ${value.text.split(' ')}`, prongs.includes(key));
        } else if (!value.text.includes('[[input]]') && prongPos.includes(key)) {
            onChange({
              ...noteProps,
              prongs: prongs.filter(pos => pos !== key),
            });
            // console.log(prongs);
        }
    });
    // adjust height function
    if (text.textArr.length*16 > height) {
      onChange({
        ...noteProps,
        height: height+16,
      });
    }
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
    // console.log("isEditing",isEditing,"isTransforming",isTransforming)
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
  //  console.log(e.target);
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

  // useEffect(() => { 
  //   console.log(
  //     layerRef.current.getIntersection({x: 50, y: 50})
  //   );
  // }, [noteProps])


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
      {/* {prongs.map((pos, index) => (
              <ProngImage 
              y={40+pos*40}
              key={index} 
              visible={isSelected ? false : true} 
              />
      ))} */}
</>
  );
}
