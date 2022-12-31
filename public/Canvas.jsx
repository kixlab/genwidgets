// import React, { useState } from 'react';
// import { Stage, Layer, Text } from 'react-konva';
// import { StickyNote } from "./StickyNote";

// export default class MyComponent extends React.Component {
//     state = {
//         text: 'Draggable Text',
//         isDragging: false,
//         x: 50,
//         y: 50,
//         width: 200,
//         height: 200,
//         selected: false
//       };
    

//     handleDragStart = () => {
//         this.setState({ isDragging: true })
//     };

//     handleDragEnd = e => {
//         this.setState({
//           isDragging: false,
//           x: e.target.x(),
//           y: e.target.y(),
//         })
//     };


//       render() {
//         return (
//           <Stage 
//             width={window.innerWidth} 
//             height={window.innerHeight}
//             onClick={(e) => {
//               if (e.currentTarget._id === e.target._id) {
//                 setSelected(false);
//               }
//             }}
//           >
//             <Layer>
//               {/* <Text
//                 text={this.state.text}
//                 onDoubleClick = {this.handleDoubleClick}
//                 x={this.state.x}
//                 y={this.state.y}
//                 draggable
//                 fill={this.state.isDragging ? 'green' : 'black'}
//                 onDragStart={this.handleDragStart}
//                 onDragEnd={this.handleDragEnd}
//               /> */}
//               <StickyNote
//                 x={50}
//                 y={50}
//                 text={this.state.text}
//                 colour="#FFDAE1"
//                 onTextChange={(value) => setText(value)}
//                 width={width}
//                 height={height}
//                 selected={selected}
//                 onTextResize={(newWidth, newHeight) => {
//                   setWidth(newWidth);
//                   setHeight(newHeight);
//                 }}
//                 onClick={() => {
//                   setSelected(!selected);
//                 }}
//                 onTextClick={(newSelected) => {
//                   setSelected(newSelected);
//                 }}
//               />
//             </Layer>
//         </Stage>
//     );
//   }
// }
