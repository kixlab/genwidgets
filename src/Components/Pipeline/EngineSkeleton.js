import React, { useState, useRef } from 'react';
import { Rect, Text, Group } from 'react-konva';
import { TextEditor } from '../Text/TextEditor'


export const EngineSkeleton = ({
    x,
    y,
    engineSize,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const textRef = useRef(null);
    const rectangleRef = useRef(null);

    const boxSize = engineSize;

    const smallBoxSize = (boxSize/2)*0.9
    const [boxes, setBoxes] = useState([
        { x: boxSize/4 - smallBoxSize/2, y: boxSize/4 - smallBoxSize/2, data: 'Engine', text: 'Box 1' },
        { x: boxSize/4 - smallBoxSize/2, y: 3*boxSize/4 - smallBoxSize/2, data: 'Temp', text: 'Box 2' },
        { x: 3*boxSize/4 - smallBoxSize/2, y: boxSize/4 - smallBoxSize/2, data: 'Presence', text: 'Box 1' },
        { x: 3*boxSize/4 - smallBoxSize/2, y: 3*boxSize/4 - smallBoxSize/2, data: 'Top-N', text: 'Box 2' }
      ]);

      const handleTextChange = (index, text) => {
        const newBoxes = [...boxes];
        newBoxes[index].text = text;
        setBoxes(newBoxes);
      };

      function toggleEdit() {
        setIsEditing(true);
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
                fontSize={10}
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
              ref={rectangleRef}
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



