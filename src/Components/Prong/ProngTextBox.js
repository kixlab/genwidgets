import React from "react";
import { Rect, Text } from "react-konva";

export const ProngTextBox = ({
    x,
    y,
    width,
    height,
    text
}) => {
    return (
        <>
        <Rect
        className="prong-text-box"
        x={x}
        y={y}
        width={width}
        height={height}
        fill={"#8900e1"}
        cornerRadius={4}
        perfectDrawEnabled={false}
        opacity={0.42}
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.3}
        shadowOffsetX={10}
        shadowOffsetY={10}
        // do not put drag functions here
      />
      <Text
        x={x+10}
        y={y+20}
        text={text}
        width={width-20}
        height={height-10}

        fill={'#ffffff'}
        fontFamily={'sans-serif'}
        perfectDrawEnabled={false}
        fontSize={16}
      />      
</>
    );
}