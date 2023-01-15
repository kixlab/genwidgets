import React from "react";
import { Rect } from "react-konva";

export const ProngTextBox = () => {
    return (
        <Rect
        className="container"
        x={-10}
        y={-20}
        width={200}
        height={100}
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
    );
}