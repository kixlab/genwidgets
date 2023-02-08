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
    allNotes,
    containerProps,
    // contNotes
}) => {
    const contNotes = allNotes.filter(note => note.container === containerProps.id);

    const handleDragEnd = (e) => {
        onChange({
            ...containerProps, 
            x: e.target.position().x,
            y: e.target.position().y
        }) 
    }
    
    return (
    <Group
    draggable 
    x={x}
    y={y}
    onDragEnd={handleDragEnd}
    >
    <Rect
    x={0}
    y={0}
    width={width}
    height={height}
    fill="white"
    stroke="black"
    strokeWidth={1}
    />
    {contNotes && contNotes.map((note, index) => {
        return(
        <Note
          key={index}
          x={0}
          y={0} 
          text={note.text}
          width={note.width}
          height={note.height}
          // prongs={note.prongs}
          
          noteProps={note}
          layerRef={layerRef}

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