import { Text, TextPath } from 'react-konva';
import React, { useState, useEffect, useRef } from 'react';

export const InputText = ({
    x,
    y,
    text,
    width,
    noteProps,
    onClick,
    onDblClick,
    visible,
    stageScale
}) => {
  const textRef = useRef(null);
  const [prongInputPos, setProngInputpos] = useState({x:null, y:null})

  function getWordPosition(word) {
    const text = textRef.current;
    const words = text.text().split(' ');
    const index = words.indexOf(word);

    if (index === -1) {
      return null;
    }

    // Get the bounding box for the text
    // const box = text.getClientRect();
    const box = text.getRelativePosition();
    // Calculate the position of the word based on the index
    // const wordWidth = box.width / words.length;
    // const wordX = box.x + index * wordWidth;
    // const wordY = box.y;
    const wordX = box.x;
    const wordY = box.y;

    return { x: wordX, y: wordY };
  }

  useEffect(() => {
    const position = getWordPosition('[[input]]');
    if (position && (position !== prongInputPos)) {
      console.log(position, x);
      setProngInputpos({x: position.x, y: position.y});
    }
  }, [noteProps]);

//   function highlightWord(word) {

    // return (
    //   <TextPath
    //     x={x}
    //     y={y}
    //     text={word}
    //     // fontSize={text.fontSize()}
    //     // fontFamily={text.fontFamily()}
    //     fill="#ff0000"
    //     startOffset={`${wordX}px`}
    //   />
    // );
  //}

//         {/* highlightWord('[[input]]')}
//  <Text
//       ref={textRef}
//       text="Hello [[input]]"
//     /> */}


  return (
    <>
    <Text
        x={x}
        y={y}
        ref={textRef}
        text={text}
        width={width}
        
        onClick={onClick}
        onTap={onClick}
        onDblClick={onDblClick}
        onDblTap={onDblClick}
        visible={visible}

        fill={'#ffffff'}
        fontFamily={'sans-serif'}
        perfectDrawEnabled={false}
        fontSize={16}
        padding={0} 
        margin={0}
      />
    <Text
        x={prongInputPos.x}
        y={y}
        text={"word"}
        fontSize={16}
        fontFamily={"sans-serif"}
        // fontSize={text.fontSize()}
        // fontFamily={text.fontFamily()}
        fill={"#ff0000"}
        // startOffset={`${}px`}
      />
      {/* {getWordPosition('[[input]]')} */}
</>
  );
}
