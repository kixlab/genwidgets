import React, { useState, useRef } from 'react';
import { Rect, Text, Group } from 'react-konva';
import { Html } from 'react-konva-utils';
import { EngineSkeleton } from "./EngineSkeleton";

export const EngineContainer = ({
    width,
    height,
    engine,
    engineSize,
    noteProps,
    onGenerate,
    onReplace,
    onChange,
    onTextClick
}) => {
    const genBtnRf = useRef(null);

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
          engine={engine}
          engineSize={engineSize}
          noteProps={noteProps}
          onReplace={onReplace}
          onChange={onChange}
          onTextClick={onTextClick}
        />
        <Html 
            class={"button"}
            innerRef={genBtnRf}
            groupProps={{ x: width + 10 + engineSize/2, y: height*1.1+10 }} 
            divProps={{ style: { opacity: 0.83} }} >
            <button class="Add-note-btn" onClick={onGenerate} >Generate</button>
        </Html>
    </>
    )
}