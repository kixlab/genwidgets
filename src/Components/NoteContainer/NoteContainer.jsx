import React, { useState, useRef } from 'react';
import { Rect, Text, Group } from 'react-konva';
import { Html } from 'react-konva-utils';
import { Note } from './Note';

export const NoteContainer = ({
    x,
    y,
    width,
    height,
    layerRef,
    onChange,
    setNotes,
    // onNoteChange,
    allNotes,
    containerProps,
    onDelete,
    // contNotes
}) => {
    const delBtnRf = useRef(null);
    const contNotes = allNotes.filter(note => note.container === containerProps.id);
    const nonContNotes = allNotes.filter(note => note.container !== containerProps.id);
    const totalHeight = contNotes.reduce((acc, note) => acc + note.height, 0)
    const heightList = contNotes.map(note => note.height)
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
    //onMouseEnter=
    >
    <Html 
      class={"button"}
      innerRef={delBtnRf}
      groupProps={{ x: width, y: 0 }} 
      divProps={{ style: { opacity: 0.63} }} >
      <button class="Delete-container-btn" onClick={onDelete} onMouseEnter>x</button>
    </Html>
    <Rect
    name={"note-container-"+`${containerProps.id}`}
    x={0}
    y={0}
    width={width+20}
    height={totalHeight + height}
    stroke="#4D94FF"
    cornerRadius={4}
    strokeWidth={5}
    />
    {contNotes && contNotes.map((note, index) => {
        return(
        <Note
          key={index}
          x={0}
          y={225*index} 
          text={note.text}
          width={width}
          height={note.height}
          // prongs={note.prongs}
          
          noteProps={note}
          containerProps={containerProps}
          layerRef={layerRef}
          // onNoteChange={onNoteChange}
          onNoteChange={(newAttrs) => {
            const nwNotes = contNotes.slice();
            nwNotes[index] = newAttrs;
            setNotes(nwNotes.concat(nonContNotes));
          }}
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
        />
        );
    })}
    </Group>
    )
}