import React, { useState, useRef } from "react";
import { Stage, Layer, Circle } from "react-konva";
import { StickyNote } from "./StickyNote";

// function 

export const Sticky = () => {
  // const [text, setText] = useState("Click to resize. Double click to edit.");
  // const [width, setWidth] = useState(200);
  // const [height, setHeight] = useState(200);
  // const [isDragging, setDragging] = useState(false);
  const [selected, setSelected] = useState(null);
  // const [x, setX] = useState(50);
  // const [y, setY] = useState(50);
  const [notes, setNotes] = useState([]);


  function handleButtonClick() {
    setNotes([...notes, { 
      x: 100, 
      y: 100, 
      text: "Click to resize. Double click to edit.", 
      isDragging: false, 
      width: 200,
      height: 200,
    }]);
  }

  return (
    <div>
    <button onClick={handleButtonClick}>Add Note</button>
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={(e) => {
        if (e.currentTarget._id === e.target._id) {
          setSelected(null);
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
        {notes.map((note, index) => (
        <StickyNote
          key={index}
          x={note.x}
          y={note.y} 
          isDragging = {note.isDragging}
          onDragStart={() => {
            note.isDragging = true
          }}
          onDragEnd ={ e => {
            note.isDragging = false
            note.x = e.target.x()
            note.y = e.target.y()
          }}
          text={note.text}
          colour="#8900e1"
          onTextChange={(value) => note.text = value}
          width={note.width}
          height={note.height}
          selected={selected}
          onTextResize={(newWidth, newHeight) => {
            note.width = newWidth;
            note.height = newHeight;
          }}
          onClick={(e) => {
            setSelected(e.target);
          }}
          onTextClick={(newSelected) => {
            setSelected(newSelected);
          }} 
        />
        ))}
      </Layer>
    </Stage>
    </div>
  );
};



