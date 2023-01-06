import { Text, TextPath } from 'react-konva';
import React, { useEffect, useRef } from 'react';

export const InputText = ({
    x,
    y,
    text,
    ref,
    width,
    onClick,
    onDblClick,
    visible
}) => {
  const textRef = useRef(null);

  function getWordPosition(word) {
    const text = textRef.current;
    const words = text.text().split(' ');
    const index = words.indexOf(word);

    if (index === -1) {
      return null;
    }

    // Get the bounding box for the text
    const box = text.getClientRect();

    // Calculate the position of the word based on the index
    const wordWidth = box.width / words.length;
    const wordX = box.x + index * wordWidth;
    const wordY = box.y;

    return { x: wordX, y: wordY };
  }

  useEffect(() => {
    const position = getWordPosition('[[input]]');
    if (position) {
      console.log(`Position of [[input]]: (${position.x}, ${position.y})`);
    }
  }, []);

  function highlightWord(word) {
    const text = textRef.current;
    const words = text.text().split(' ');
    const index = words.indexOf(word);

    if (index === -1) {
      return null;
    }

    // Calculate the position of the word based on the index
    const wordWidth = text.width() / words.length;
    const wordX = index * wordWidth;

    return (
      <TextPath
        x={x}
        y={y}
        text={word}
        // fontSize={text.fontSize()}
        // fontFamily={text.fontFamily()}
        fill="#ff0000"
        startOffset={`${wordX}px`}
      />
    );
  }

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
      />
      {/* {highlightWord('[[input]]')} */}
</>
  );
}
