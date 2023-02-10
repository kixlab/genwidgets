import React, { useState, useRef } from 'react';
import { Rect, Text, Group } from 'react-konva';
import { Note } from './Note';

export const NoteContainer = ({
    x,
    y,
    width,
    height,
    layerRef,
    onChange,
    onNoteChange,
    allNotes,
    containerProps,
    // contNotes
}) => {
    const contNotes = allNotes.filter(note => note.container === containerProps.id);
    const [dragBool, setDragBool] = useState(true);
    const handleDragEnd = (e) => {
        if (dragBool) {
        onChange({
            ...containerProps, 
            x: e.target.position().x,
            y: e.target.position().y
        }) 
    }
    }

    return (
    <Group
    draggable={dragBool}
    x={x}
    y={y}
    onDragEnd={handleDragEnd}
    >
    <Rect
    name={"note-container-"+`${containerProps.id}`}
    x={0}
    y={0}
    width={width+20}
    height={height}
    stroke="#4D94FF"
    cornerRadius={4}
    strokeWidth={5}
    />
    {contNotes && contNotes.map((note, index) => {
        return(
        <Note
          key={index}
          x={0}
          y={0} 
          text={note.text}
          width={width}
          height={note.height}
          // prongs={note.prongs}
          
          noteProps={note}
          layerRef={layerRef}
          onNoteChange={onNoteChange}
          toggleDrag={(bool)=>setDragBool(bool)}

        //   onSelect={() => {
        //     setSelectedId(note.id);
        //     setIsEditing(false);
        //     setLastTouch({x:note.x+30, y:note.y+30})
        //   }}
        //   onChange={(newAttrs) => {
        //     const nwcontNotes = contNotes.slice();
        //     nwcontNotes[index] = newAttrs;
        //     setcontNotes(nwcontNotes);
        //   }}
        //   onReplace={replaceNote} // on change but stronger
        //   onTextClick={() => {
        //     setSelectedId(note.id);
        //     setIsEditing(true);
        //   }}
          // onDelete={handleDeleteClick}
        />
        );
    })}
    </Group>
    )
}