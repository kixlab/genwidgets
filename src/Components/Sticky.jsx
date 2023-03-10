import React, { useEffect, useState, useRef } from "react";
import { Stage, Layer } from "react-konva";
import { StickyNote } from "./StickyNote";

const JOIN_DIST = 300;

// for stage pan and zoom

const scaleBy = 0.99;

function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCenter(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

function isTouchEnabled() { 
  return ( 'ontouchstart' in window ) ||  
         ( navigator.maxTouchPoints > 0 ) ||  
         ( navigator.msMaxTouchPoints > 0 ); 
} 

// --- for stage pan and zoom ends ---

export const Sticky = () => {
  const newid = useRef(0);
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [minDistance, setMinDistance] = useState({ distance: null, nodes: [] });

  const [clipboardNote, setClipboardNote] = useState(null);
  const [lastTouch, setLastTouch] = useState({x:null, y:null});
  const [isEditing, setIsEditing] = useState(false);
  const [scale, setScale] = useState(1);

  const layerRef = useRef(null);

  // for stage pan and zoom

  const stageRef = useRef(null);
  let lastCenter = null;
  let lastDist = 0;
  
  function zoomStage(event) {
    event.evt.preventDefault();
    if (stageRef.current !== null) {
      const stage = stageRef.current;
      const oldScale = stage.scaleX();
      const { x: pointerX, y: pointerY } = stage.getPointerPosition();
      const mousePointTo = {
        x: (pointerX - stage.x()) / oldScale,
        y: (pointerY - stage.y()) / oldScale,
      };
      const newScale = event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      setScale(newScale);

      stage.scale({ x: newScale, y: newScale });
      const newPos = {
        x: pointerX - mousePointTo.x * newScale,
        y: pointerY - mousePointTo.y * newScale,
      }
      stage.position(newPos);
      stage.batchDraw();
    }
  }

  function handleTouch(e) {
    e.evt.preventDefault();
    var touch1 = e.evt.touches[0];
    var touch2 = e.evt.touches[1];
    const stage = stageRef.current;
    if (stage !== null) {
      if (touch1 && touch2) {
        if (stage.isDragging()) {
          stage.stopDrag();
        }
  
        var p1 = {
          x: touch1.clientX,
          y: touch1.clientY
        };
        var p2 = {
          x: touch2.clientX,
          y: touch2.clientY
        };
  
        if (!lastCenter) {
          lastCenter = getCenter(p1, p2);
          return;
        }
        var newCenter = getCenter(p1, p2);
  
        var dist = getDistance(p1, p2);
  
        if (!lastDist) {
          lastDist = dist;
        }
  
        // local coordinates of center point
        var pointTo = {
          x: (newCenter.x - stage.x()) / stage.scaleX(),
          y: (newCenter.y - stage.y()) / stage.scaleX()
        };
  
        var scale = stage.scaleX() * (dist / lastDist);
        setScale(scale);
        stage.scaleX(scale);
        stage.scaleY(scale);
  
        // calculate new position of the stage
        var dx = newCenter.x - lastCenter.x;
        var dy = newCenter.y - lastCenter.y;
  
        var newPos = {
          x: newCenter.x - pointTo.x * scale + dx,
          y: newCenter.y - pointTo.y * scale + dy
        };
  
        stage.position(newPos);
        stage.batchDraw();
  
        lastDist = dist;
        lastCenter = newCenter;
      }
    }
  }

  function handleTouchEnd() {
    lastCenter = null;
    lastDist = 0;
  }

  //* --- for stage pan and zoom ends --- */ 


  // useEffect(() => {
  //   if (selectedId !== null) {
  //     const selectNote = [...notes].filter(note => note.id === selectedId)[0]
  //     setLastTouch({x:selectNote.x+30, y:selectNote.y+30})
  //     console.log("busted")
  //   } 
  // }, [notes]);

  const handleDeleteClick = () => {
    setNotes(notes.filter((note) => note.id!== selectedId));
    setSelectedId(null); 
  }

  useEffect(() => { 
    
    console.log(
    "selectedId",
    notes
    // [...notes].filter(note => note.id === selectedId)[0],
    // [...notes].filter(note => note.prongs.length === 0), //prong node
    // [...notes].filter(note => note.prongs.length !== 0)
    );
  }, [notes,selectedId])

      // calculate the minimum distance between nodes
  // useEffect(() => {
  //   if (notes.length > 1) {
  //     // use the Pythagorean theorem to calculate the distance between each pair of nodes
  //     const notesCopy = [...notes]
  //     const distances = notesCopy.map((note1, index1) => {
  //       return notesCopy.slice(index1 + 1).map((note2, index2) => {
  //         const a = note2.x - note1.x;
  //         const b = note2.y - note1.y;
  //         return {
  //           distance: Math.sqrt(a * a + b * b),
  //           nodes: [note1, note2]
  //         };
  //       });
  //     });

  //     // flatten the distances array
  //     const flatDistances = distances.reduce((acc, val) => acc.concat(val), []);

  //     // find the minimum distance and the nodes that have the minimum distance
  //     const minDistance = flatDistances.reduce((min, { distance, nodes }) => {
  //       if (distance < min.distance) {
  //         return { distance, nodes };
  //       } else {
  //         return min;
  //       }
  //     }, flatDistances[0]);
  //     console.log("confirm")
  //     setMinDistance(minDistance);
  //   }
  // }, [notes]);

  // this can be made cheaper
  // concatonates nodes to the oldest and nearest node
  const handleConcatClick = (e) =>  {
    e.preventDefault();
    if (minDistance.distance !== null && minDistance.distance < JOIN_DIST) {
      const [node1, node2] = minDistance.nodes;
      const [node1text, node2text] = [node1.text, node2.text]
      const newNotes = notes.filter((note) => note.id!== node2.id);
      // use timeout to fix timing issues
      setTimeout(() => {
        setNotes([...newNotes].map(note => {
          if (note.id === node1.id) {
            return { ...note, text: node1text + ' and ' + node2text };
          } else {
            return note;
          }
        }));
      }, 100); // setnotes is slow
      setSelectedId(null); 
    }
  }


  const DELETE_KEY = 46;
  const BACKSPACE = 8;

  const handleKeyDown = (event)=>{
    // console.log(event)
    // event.preventDefault()
    let charCode = String.fromCharCode(event.which).toLowerCase();
    if (!isEditing){
    if((event.ctrlKey || event.metaKey) && charCode === 's') {
      alert("Save feature does not exist");
    }else if((event.ctrlKey || event.metaKey) && charCode === 'c' && selectedId !== null) {
      setClipboardNote([...notes].filter(note => note.id === selectedId)[0]);
    }else if((event.ctrlKey || event.metaKey) && charCode === 'x' && selectedId !== null) {
      setClipboardNote([...notes].filter(note => note.id === selectedId)[0]);
      handleDeleteClick();
    }else if((event.keyCode === DELETE_KEY || event.keyCode === BACKSPACE || event.metaKey) && selectedId !== null) {
      handleDeleteClick();
    }else if((event.ctrlKey || event.metaKey) && charCode === 'v') {
      setNotes([...notes, { 
        ...clipboardNote,
        id: newid.current++,
        ...lastTouch
        // x: clipboardNote.x + 30,
        // y: clipboardNote.y + 30
      }]);
    }}
  }
  
  // change some attr(s) of a note and put the new note in here
  const replaceNote = (newNote) => {
    // const newNotes = notes.filter((note) => note.id!== newNote.id);
    // use timeout to fix timing issues
    setTimeout(() => {
      setNotes([...notes].map(note => {
        if (note.id === newNote.id) {
          return newNote;
        } else {
          return note;
        }
      }));
    }, 100); // setnotes is slow
    setSelectedId(null); //
  setTimeout(() => {
    console.log("This is the note after replacemnt",notes);
  }, 1000); // setnotes is slow
  };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    // console.log(e.target.getRelativePointerPosition());
    setLastTouch(e.target.getRelativePointerPosition());
    if (clickedOnEmpty) {
      setSelectedId(null);
      setIsEditing(false);
    }
  };

  return (
    <div 
      tabIndex={1} 
      onKeyDown={handleKeyDown}
      >
      <aside><h1>Genwidgets</h1></aside>
      <p>
        Minimum distance between nodes:{" "}
        {minDistance.nodes.map(node => node.id).join(", ")} ({minDistance.distance})
      </p>
      <p>
        Double tap on canvas to add text. Pan and zoom canvas as needed.
      </p>
    <button class="Concat-note-btn" onClick={handleConcatClick}>Concat Near</button>
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
      onClick={checkDeselect}
      onDblClick={(e) => {
        if (selectedId === null) {
          setNotes([...notes, { 
          id: newid.current++,
          x: e.target.getRelativePointerPosition().x, // fixed position bug
          y: e.target.getRelativePointerPosition().y, 
          text: 'Tap to select. Double Tap to Edit.', 
          width: 200,
          height: 200,
          prongs: [], //prongs
        }]);
      }}}

      // for stage pan and zoom
      draggable={!isTouchEnabled()}
      onWheel={zoomStage}
      onTouchMove={handleTouch}
      onTouchEnd={handleTouchEnd}
      ref={stageRef}
      // ---------------------

    >
      <Layer ref={layerRef}>
      {notes.map((note, index) => {
        return(
        <StickyNote
          key={index}
          x={note.x}
          y={note.y} 
          text={note.text}
          width={note.width}
          height={note.height}
          prongs={note.prongs}
          
          noteProps={note}
          layerRef={layerRef}
          isSelected={note.id === selectedId}
          onSelect={() => {
            setSelectedId(note.id);
            setIsEditing(false);
            setLastTouch({x:note.x+30, y:note.y+30})
          }}
          onChange={(newAttrs) => {
            const nwNotes = notes.slice();
            nwNotes[index] = newAttrs;
            setNotes(nwNotes);
          }}
          onReplace={replaceNote} // on change but stronger
          onFilter={(note) => {
            console.log("This note state before filter",notes);
            setTimeout(() => {
            setNotes([...notes].filter(nt => nt.id !== note.id));
          }, 100); // setnotes is slow
            console.log("This note state after filter",notes);
          }}
          onTextClick={() => {
            setSelectedId(note.id);
            setIsEditing(true);
          }}
          onDelete={handleDeleteClick}
        />
        );
      })}
      </Layer>
    </Stage>
    </div>
  );
};



