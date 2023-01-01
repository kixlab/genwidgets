import React, { useEffect, useState, useRef } from "react";
import { Stage, Layer, Circle } from "react-konva";
import { StickyNote } from "./StickyNote";

export const Sticky = () => {
  const newid = useRef(0);
  const [notes, setNotes] = useState([]);
  const [selectedId, selectNote] = useState(null);

  function handleButtonClick() {
    setNotes([...notes, { 
      id: newid.current++,
      x: 100, 
      y: 100, 
      text: 'Tap to select. Double Tap to Edit.', 
      width: 200,
      height: 200,
    }]);
  }
  useEffect(() => { console.log(notes,selectedId) }, [notes,selectedId])

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectNote(null);
    }
  };

  return (
    <div>
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
          isSelected={note.id === selectedId}
          onSelect={() => {
            selectNote(note.id);
          }}
          onChange={(newAttrs) => {
            const newNotes = notes.slice();
            newNotes[index] = newAttrs;
            setNotes(newNotes);
          }}
        />
        );
      })}
      </Layer>
    </Stage>
    </div>
  );
};



