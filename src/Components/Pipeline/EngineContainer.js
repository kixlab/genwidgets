import React, { useState, useRef } from 'react';
import { Rect, Text, Group } from 'react-konva';
import { EngineSkeleton } from "./EngineSkeleton";

export const EngineContainer = ({
    width,
    height,
    engineSize,
}) => {
    return (
        <>
        <Rect
          x={-10}
          y={-10}
          width={width + 70 + engineSize}
          height={height + 80}

          fill={"#d3d3d3"}
          cornerRadius={4}
          perfectDrawEnabled={false}
          opacity={0.42}
          shadowColor="black"
          shadowBlur={10}
          shadowOpacity={0.3}
          shadowOffsetX={10}
          shadowOffsetY={10}
        />
        <EngineSkeleton
          x={width+50}
          y={0}
          engineSize={engineSize}
        />
    </>
    )
}