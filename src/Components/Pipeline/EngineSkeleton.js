import React, { useState, useRef } from 'react';
import { Rect, Text, Group } from 'react-konva';
import { TextEditor } from '../Text/TextEditor'


export const EngineSkeleton = ({
    x,
    y,
    engine,
    engineSize,
    noteProps,
    onReplace,
    onChange
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const textRef = useRef(null);
    const [editingBoxName, setEditingBoxName] = useState(null);
    //const index = useState();

    const boxSize = engineSize;

    const smallBoxSize = (boxSize/2)*0.9
    const boxes = [
        { x: boxSize/4 - smallBoxSize/2, y: boxSize/4 - smallBoxSize/2, data: 'Engine', text: engine.eng },
        { x: boxSize/4 - smallBoxSize/2, y: 3*boxSize/4 - smallBoxSize/2, data: 'Temp', text: engine.temperature },
        { x: 3*boxSize/4 - smallBoxSize/2, y: boxSize/4 - smallBoxSize/2, data: 'Presence', text: engine.presencePen },
        { x: 3*boxSize/4 - smallBoxSize/2, y: 3*boxSize/4 - smallBoxSize/2, data: 'Top-P', text: engine.topP }
      ];

      // const handleEngineChange = (e) => {
        
      //   onChange({
      //     ...noteProps,
      //     engine: e.target.position().x,
      //   });
      // }

      const handleTextChange = (e) => {
        e.preventDefault();
        if (editingBoxName === "Top-P") {
          // const upEng = {...engine, topP: e.target.value}
          // console.log(upEng)
          onChange({
            ...noteProps,
            engine: {...engine, topP: e.target.value},
          });
        } else if (editingBoxName === "Temp") {
          onChange({
            ...noteProps,
            engine: {...engine, temperature: e.currentTarget.value},
          });
        } else if (editingBoxName === "Presence") {
          onChange({
            ...noteProps,
            engine: {...engine, presencePen: e.currentTarget.value},
          });
        } else if (editingBoxName === "Engine") {
          onChange({
            ...noteProps,
            engine: {...engine, eng: e.currentTarget.value},
          });
        }

      };

      const toggleEdit = (e) => {
        setIsEditing(true);
        setEditingBoxName(e.target.name());
        console.log(textRef.current.name());
      }
    

    return (
        <Group
        x={x}
        y={y}
        >
        <Rect
        x={0}
        y={0}
        width={boxSize}
        height={boxSize}
        fill={"#4D94FF"}
        cornerRadius={4}
        perfectDrawEnabled={false}
      />
      {boxes.map((box, index) => (
          <React.Fragment key={index}>
            <Rect
              x={box.x}
              y={box.y}
              width={smallBoxSize}
              height={smallBoxSize}
              fill="#ffffff"
              cornerRadius={4}
              perfectDrawEnabled={false}
            />
            <Text
                name={box.data}
                x={box.x}
                y={box.y + 2.5*smallBoxSize / 4}
                width={smallBoxSize}
                height={smallBoxSize}

                ref={textRef}
                text={box.text}
                onDblClick={toggleEdit}
                onDblTap={toggleEdit}// more methods
                visible={!isEditing}

                fill={'#0a0a0a'}
                fontFamily={'sans-serif'}
                align={'center'}
                perfectDrawEnabled={false}
                fontSize={8}
            />
            {isEditing && (
                <TextEditor
                    x={box.x }
                    y={box.y + 2.5*smallBoxSize / 4}
                    width={smallBoxSize}
                    height={smallBoxSize}
                    value={box.text}
                    textNodeRef={textRef}
                    onChange={handleTextChange}
                    //onKeyDown={handleEscapeKeys}
                    onBlur={() => {
                    setIsEditing(false);
                    }}
                />
            )}
            <Rect
              x={box.x+smallBoxSize*0.05}
              y={box.y+smallBoxSize*0.05}
              width={smallBoxSize*0.9}
              height={smallBoxSize*0.4}
              fill="#00D1B2"
              cornerRadius={4}
              perfectDrawEnabled={false}
            />
            <Text
                text={box.data}
                x={box.x+smallBoxSize*0.05}
                y={box.y+smallBoxSize*0.05}
                width={smallBoxSize*0.9}
                height={smallBoxSize*0.4}
                fontStyle="bold"
                fontFamily='sans-serif'
                fill="#ffffff"
                fontSize={8}
                align="center"
                verticalAlign="middle"
            />
          </React.Fragment>
        ))}  
</Group>
    );
}



