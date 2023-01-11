// import React, { useState } from 'react';
// import { Stage, Layer, Text, Star } from 'react-konva';

// function MyCanvas() {
//   const [width, setWidth] = useState(window.innerWidth);
//   const [height, setHeight] = useState(window.innerHeight);
//   const [tempLayer, setTempLayer] = useState(null);
//   const [previousShape, setPreviousShape] = useState(null);

//   return (
//     <Stage
//       width={width}
//       height={height}
//       onMouseMove={evt => {
//         if (!tempLayer) {
//           return;
//         }
//         const pos = evt.target.getPointerPosition();
//         const layer = evt.getLayer();
//         const shape = layer.getIntersection(pos);
//         if (previousShape && shape) {
//           if (previousShape !== shape) {
//             // leave from old targer
//             previousShape.fire(
//               'dragleave',
//               {
//                 evt: evt.evt,
//               },
//               true
//             );
//             // enter new targer
//             shape.fire(
//               'dragenter',
//               {
//                 evt: evt.evt,
//               },
//               true
//             );
//             setPreviousShape(shape);
//           } else {
//             previousShape.fire(
//               'dragover',
//               {
//                 evt: evt.evt,
//               },
//               true
//             );
//           }
//         } else if (!previousShape && shape) {
//           setPreviousShape(shape);
//           shape.fire(
//             'dragenter',
//             {
//               evt: evt.evt,
//             },
//             true
//           );
//         } else if (previousShape && !shape) {
//           previousShape.fire(
//             'dragleave',
//             {
//               evt: evt.evt,
//             },
//             true
//           );
//           setPreviousShape(undefined);
//         }
//       }}
//       onMouseUp={() => {
//         if (!tempLayer) {
//           return;
//         }
//         const pos = evt.target.getPointerPosition();
//         const layer = evt.getLayer();
//         const shape = layer.getIntersection(pos);
//         if (shape) {
//           previousShape.fire(
//             'drop',
//             {
//               evt: evt.evt,
//             },
//             true
//           );
//         }
//         setPreviousShape(undefined);
//         setTempLayer(null);
//       }}
//     >
//       <Layer>
//         <Text fill="black" />
//         {[...Array(10)].map((_, i) => (
//           <Star
//             x={width * Math.random()}
//             y={height * Math.random()}
//             fill="blue"
//             numPoints={10}
//             innerRadius={20}
//             outerRadius={25}
//             draggable={true}
//             name={`star ${i}`}
//             shadowOffsetX={5}
//             shadowOffsetY={5}
//             onDragStart={evt => {
//             setTempLayer(evt.target);
//             evt.target.moveTo(tempLayer);
//             tempLayer.draw();
//             console.log(`Moving ${evt.target.name()}`);
//             }}
//             onDragEnter={evt => {
//             evt.target.fill('green');
//             console.log(`dragenter ${evt.target.name()}`);
//             }}
//             onDragLeave={evt => {
//             evt.target.fill('blue');
//             console.log(`dragleave ${evt.target.name()}`);
//             }}
//             onDragOver={evt => {
//             console.log(`dragover ${evt.target.name()}`);
//             }}
//             onDrop={evt => {
//             evt.target.fill('red');
//             console.log(`drop ${evt.target.name()}`);
//             }}
//             />
//             ))}
//             </Layer>
//             </Stage>
//             );
//             }
            
//             export default MyCanvas;
