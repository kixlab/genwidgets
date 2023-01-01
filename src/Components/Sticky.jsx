import React, { useEffect, useState, useRef } from "react";
import { Stage, Layer, Circle } from "react-konva";
import { StickyNote } from "./StickyNote";

export const Sticky = () => {
  const newid = useRef(0);
  const [notes, setNotes] = useState([]);
  const [selectedId, selectNote] = useState(null);

  // const [draggedId, setDraggedItem] = useState(null);

  // const handleDragStart = (event) => {
  //   const target = event.target;
  //   setDraggedItem(target);
  // };

  // const handleDragEnd = (event) => {
  //   const target = event.target;
  //   if (draggedItem && target) {
  //       const text1 = draggedItem.value || '';
  //       const text2 = target.value || '';
  //       target.value = text2 + ' and ' + text1;
  //       draggedItem = null
  //     }
  //   setDraggedItem(null);
  // };

  function handleAddClick() {
    setNotes([...notes, { 
      id: newid.current++,
      x: 100, 
      y: 100, 
      text: 'Tap to select. Double Tap to Edit.', 
      width: 200,
      height: 200,
    }]);
  }

  function handleDeleteClick() {
    setNotes(notes.filter((note) => note.id!== selectedId));
  }

  useEffect(() => { 
    console.log(notes,selectedId,
      //draggedItem
      ) }, 
    [notes,selectedId,
      //draggedItem
    ]
    )

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectNote(null);
    }
  };

  return (
    <div>
      <aside><h1>Genwidgets</h1></aside>
    <button class="Add-note-btn" onClick={handleAddClick}>Add Note</button>
    &nbsp;
    <button class="Delete-note-btn" onClick={handleDeleteClick}>Delete Note</button>
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer >
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
          // isDragged={note.id = draggedId}
          // onDragStart={() => {
          //   setDraggedItem(note.id);
          // }}
          // onDragEnd={() => {
          //   setDraggedItem(null);
          // }}
          // onDragStart={handleDragStart}
          // onDragEnd={handleDragEnd}
        />
        );
      })}
      </Layer>
    </Stage>
    </div>
  );
};



