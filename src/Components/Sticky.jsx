import React, { useEffect, useState, useRef } from "react";
import { Stage, Layer, Circle } from "react-konva";
import { StickyNote } from "./StickyNote";

const JOIN_DIST = 30;

export const Sticky = () => {
  const newid = useRef(0);
  const [notes, setNotes] = useState([]);
  const [selectedId, selectNote] = useState(null);

  const [minDistance, setMinDistance] = useState({ distance: null, nodes: [] });

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

      // calculate the minimum distance between nodes
  useEffect(() => {
    if (notes.length > 1) {
      // use the Pythagorean theorem to calculate the distance between each pair of nodes
      const distances = notes.map((note1, index1) => {
        return notes.slice(index1 + 1).map((note2, index2) => {
          const a = note2.x - note1.x;
          const b = note2.y - note1.y;
          return {
            distance: Math.sqrt(a * a + b * b),
            nodes: [note1, note2]
          };
        });
      });

      // flatten the distances array
      const flatDistances = distances.reduce((acc, val) => acc.concat(val), []);

      // find the minimum distance and the nodes that have the minimum distance
      const minDistance = flatDistances.reduce((min, { distance, nodes }) => {
        if (distance < min.distance) {
          return { distance, nodes };
        } else {
          return min;
        }
      }, flatDistances[0]);

      setMinDistance(minDistance);
    }
  }, [notes]);

  // this can be made cheaper
  
  useEffect(() =>  {
    if (minDistance.distance !== null && minDistance.distance < JOIN_DIST) {
      const [node1, node2] = minDistance.nodes;
      const [node1text, node2text] = [node1.text, node2.text]
      const newNotes = notes.map(note => {
        if (note.id === node1.id) {
          return { ...note, text: node1text + ' and ' + node2text };
        } else {
          return note;
        }
      });
      setNotes(newNotes.filter((note) => note.id!== node2.id));
    }
  }, [selectedId]);

  

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
      <p>
        Minimum distance between nodes:{" "}
        {minDistance.nodes.map(node => node.id).join(", ")} ({minDistance.distance})
      </p>
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
          onTextClick={() => {
            selectNote(note.id);
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



