import { Text } from 'react-konva';
import React, { useState, useEffect, useRef } from 'react';
import { ProngImage } from './ProngImage';

export const InputText = ({
    x,
    y,
    text,
    width,
    noteProps,
    onClick,
    onDblClick,
    visible,
    isSelected
}) => {
  const textRef = useRef(null);
  const [prongInputPos, setProngInputpos] = useState([]);

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
    // adjust height function
  }, [noteProps]);

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
