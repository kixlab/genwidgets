import React, { useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import TextEditor from '../Text/TextEditor'


export const EngineSkeleton = ({
    x,
    y,
    width,
    height,
    text
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const textRef = useRef(null);

    const boxSize = useState(100);

    const smallBoxSize = (boxSize/2)*0.8
    const [boxes, setBoxes] = useState([
        { x: boxSize/4 - smallBoxSize/2, y: boxSize/4 - smallBoxSize/2, width: smallBoxSize, height: smallBoxSize, text: 'Box 1' },
        { x: boxSize/4 - smallBoxSize/2, y: 3*boxSize/4 - smallBoxSize/2, width: smallBoxSize, height: smallBoxSize, text: 'Box 2' },
        { x: 3*boxSize/4 - smallBoxSize/2, y: boxSize/4 - smallBoxSize/2, width: smallBoxSize, height: smallBoxSize, text: 'Box 1' },
        { x: 3*boxSize/4 - smallBoxSize/2, y: 3*boxSize/4 - smallBoxSize/2, width: smallBoxSize, height: smallBoxSize, text: 'Box 2' }
      ]);

    return (
        <>
        <Rect
        x={x}
        y={y}
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
              width={box.width}
              height={box.height}
              fill="#666666"
              cornerRadius={4}
              perfectDrawEnabled={false}
            />
            <Text
              x={box.x + box.width / 2}
              y={box.y + box.height / 2}
              text={box.text}
              onChange={(e) => handleTextChange(index, e.target.text)}
            />
            {isEditing && (
                <TextEditor
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    value={text}
                    textNodeRef={textRef}
                    onChange={handleTextChange}
                    onKeyDown={handleEscapeKeys}
                    onBlur={() => {
                    setIsEditing(false);
                    }}
                />
            )}
          </React.Fragment>
        ))}
      <Text
        x={x+10}
        y={y+20}
        text={text}
        width={width-20}
        height={height-10}

        fill={'#ffffff'}
        fontFamily={'sans-serif'}
        perfectDrawEnabled={false}
        fontSize={16}
      />      
</>
    );
}


const App = () => {
  const [boxes, setBoxes] = useState([
    { x: 20, y: 20, width: 100, height: 100, text: 'Box 1' },
    { x: 140, y: 20, width: 100, height: 100, text: 'Box 2' },
    { x: 260, y: 20, width: 100, height: 100, text: 'Box 3' },
    { x: 380, y: 20, width: 100, height: 100, text: 'Box 4' },
  ]);

  const handleTextChange = (index, text) => {
    const newBoxes = [...boxes];
    newBoxes[index].text = text;
    setBoxes(newBoxes);
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {boxes.map((box, index) => (
          <React.Fragment key={index}>
            <Rect
              x={box.x}
              y={box.y}
              width={box.width}
              height={box.height}
            />
            <Text
              x={box.x + box.width / 2}
              y={box.y + box.height / 2}
              text={box.text}
              onChange={(e) => handleTextChange(index, e.target.text)}
            />
          </React.Fragment>
        ))}
      </Layer>
    </Stage>
  );
};

