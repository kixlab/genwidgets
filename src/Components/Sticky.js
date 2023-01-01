import React, { useState, useRef } from "react";
import { Stage, Layer, Circle } from "react-konva";
import { StickyNote } from "./StickyNote";

export const Sticky = () => {
  const [name, setName] = useState('');
  const newid = useRef(0);
 //  const [text, setText] = useState("Click to resize. Double click to edit.");
  // const [width, setWidth] = useState(200);
  // const [height, setHeight] = useState(200);

  // const [x, setX] = useState(50);
  // const [y, setY] = useState(50);
  const [notes, setNotes] = useState([]);
  const [selectedId, selectNote] = useState(null);


  function handleButtonClick() {
    setNotes([...notes, { 
      id: newid.current++,
      x: 100, 
      y: 100, 
      text: name, 
      width: 200,
      height: 200,
    }]);
  }

  // const handleTextChange = (id, value) => {
  //   const newNotes = notes.map(note => {
  //       if (note.id === id){
  //         return {...note, text: value}
  //       }
  //       return note
  //     })
  //   setNotes( newNotes )
  // }

  // const handleTextResize = (id, newWidth, newHeight) => {
  //   const newNotes = notes.map(note => {
  //       if (note.id === id){
  //         return {...note, width: newWidth, height: newHeight}
  //       }
  //       return note
  //     })
  //   setNotes( newNotes )
  // }

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectNote(null);
    }
  };

  return (
    <div>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
    <button onClick={handleButtonClick}>Add Note</button>
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
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
      {notes.map((note, index) => {
        return(
        <StickyNote
          key={index}
          x={note.x}
          y={note.y} 
          text={note.text}
          width={note.width}
          height={note.height}
          
          noteProps={note}
          // onDragStart={() => {
          //   setDragging(true)
          // }}
          // onDragEnd ={ () => {
          //   setDragging(false)
          //   // note.x = e.target.x()
          //   // note.y = e.target.y()
          // }}
          isSelected={note.id === selectedId}
          onSelect={() => {
            selectNote(note.id);
          }}
          onChange={(newAttrs) => {
            const notes = notes.slice();
            notes[index] = newAttrs;
            setNotes(notes);
          }}

          // onTextChange={(value) => handleTextChange(index,value)}
          
          // selected={selected}
          // onTextResize={(newWidth, newHeight) => 
          //   {handleTextResize(index, newWidth, newHeight);
          // }}
          // onClick={() => {
          //   setSelected(!selected);
          // }}
          onTextClick={() => {
            selectNote(note.id);
          }} 
        />
        );
      })}
      </Layer>
    </Stage>
    </div>
  );
};



