import React, { useState, useRef } from "react";
import { Stage, Layer, Circle } from "react-konva";
import { StickyNote } from "./StickyNote";

// function 

export const StickySingle = () => {
  const [text, setText] = useState("Click to resize. Double click to edit.");
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [isDragging, setDragging] = useState(false);
  const [selected, setSelected] = useState(false);
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);

  return (
    <div>
    {/* <button onClick={handleButtonClick}>Add Note</button> */}
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={(e) => {
        if (e.currentTarget._id === e.target._id) {
          setSelected(false);
        }
      }}
    >
      <Layer >
      <Circle
          name="draggableCircle"
          x={50}
          y={50}
          radius={25}
          fill="green"
          draggable
        />
        {/* {notes.map((note, index) => ( */}
        <StickyNote
          // key={index}
          x={x}
          y={y} 
          isDragging = {isDragging}
          onDragStart={() => {
            setDragging(true)
          }}
          onDragEnd ={ e => {
            setDragging(false)
            setX(e.target.x())
            setY(e.target.y())
          }}
          text={text}
          colour="#8900e1"
          onTextChange={(value) => setText(value)}
          width={width}
          height={height}
          selected={selected}
          onTextResize={(newWidth, newHeight) => {
            setWidth(newWidth);
            setHeight(newHeight);
          }}
          onClick={() => {
            setSelected(!selected);
          }}
          onTextClick={(newSelected) => {
            setSelected(newSelected);
          }} 
        />
        {/* ))} */}
      </Layer>
    </Stage>
    </div>
  );
};



