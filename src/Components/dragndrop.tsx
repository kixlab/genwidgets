
// type CanvasProps = React.DetailedHTMLProps<
//     React.HTMLAttributes<HTMLCanvasElement>, 
//     HTMLCanvasElement>
//     & {draw: (context: CanvasRenderingContext2D) => void};
//     ;


// const Canvas: React.FC<CanvasProps> = ({ draw, ...props }) => {
//     const canvasRef = useRef<HTMLCanvasElement | null>(null);
//     useEffect(() => {
//         if (!canvasRef.current) {
//             return;
//         } // look at current state

//         const canvas = canvasRef.current;

//         if (!canvas) {
//             return;
//         } // check for existing canvas

//         const ctx = canvas.getContext('2d');

//         if (!ctx) {
//             return;
//         } // create canvas

//         draw(ctx);

//         // ctx.clearRect(0, 0, canvas.width, canvas.height);
//         // draw background as required

//         // ctx.fillStyle = '#000000';
//         // ctx.fillRect(0, 0, canvas.width, canvas.height);
//         // ctx.strokeStyle = '#000000';
//         // ctx.strokeRect(0, 0, canvas.width, canvas.height);
        

//         // update canvas
//         // ctx.putImageData(canvas.width, canvas.height, 0, 0);
//     }, [draw]);

    
//     return <canvas width={props.width} height={props.height} ref={canvasRef}/>;

// };

// export default Canvas


///////////////////////////////////////////////////////////////////////////

// import React, { useRef, useEffect, useState } from 'react';

// const DragAndDrop: React.FC = () => {
//   const [draggedItem, setDraggedItem] = useState<HTMLElement | null>(null);
//   const dropRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleDragStart = (event: DragEvent) => {
//       const target = event.target as HTMLElement;
//       setDraggedItem(target);
//       target.style.opacity = '0.4';
//     };

//     const handleDragEnd = (event: DragEvent) => {
//       const target = event.target as HTMLElement;
//       target.style.opacity = '1';
//       setDraggedItem(null);
//     };

//     const handleDragOver = (event: DragEvent) => {
//       event.preventDefault();
//     };

//     const handleDrop = (event: DragEvent) => {
//       event.preventDefault();
//       const target = event.target as HTMLElement;
//       if (draggedItem && target) {
//         target.appendChild(draggedItem);
//       }
//     };

//     const items = document.querySelectorAll('.item');
//     items.forEach((item: Element) => {
//       item.addEventListener('dragstart', handleDragStart);
//       item.addEventListener('dragend', handleDragEnd);
//     });

//     const dropZone = dropRef.current;
//     if (dropZone) {
//       dropZone.addEventListener('dragover', handleDragOver);
//       dropZone.addEventListener('drop', handleDrop);
//     }

//     return () => {
//       items.forEach((item: Element) => {
//         item.removeEventListener('dragstart', handleDragStart);
//         item.removeEventListener('dragend', handleDragEnd);
//       });

//       if (dropZone) {
//         dropZone.removeEventListener('dragover', handleDragOver);
//         dropZone.removeEventListener('drop', handleDrop);
//       }
//     };
//   }, [draggedItem]);

//   return (
//     <div>
//       <div className="item" draggable>Item 1</div>
//       <div className="item" draggable>Item 2</div>
//       <div className="item" draggable>Item 3</div>
//       <div ref={dropRef} className="drop-zone">Drop Zone</div>
//     </div>
//   );
// };

// export default DragAndDrop;




//////////////////////////////////////////////////////////////////////

import React, { useRef, useEffect, useState } from 'react';

type CanvasProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLCanvasElement>, 
    HTMLCanvasElement>
    & {draw: (context: CanvasRenderingContext2D) => void};
    ;

const DragAndDrop: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [draggedItem, setDraggedItem] = useState<HTMLElement | null>(null);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [combinedText, setCombinedText] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '16px Arial';
        context.fillStyle = 'red';
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.fillText(combinedText, 10, 50);
        context.strokeRect(5, 45, context.measureText(combinedText).width + 10, 20);
      }
    }
  }, [combinedText]);

  useEffect(() => {
    const handleDragStart = (event: DragEvent) => {
      const target = event.target as HTMLElement;
      setDraggedItem(target);
      target.style.opacity = '0.4';
    };

    const handleDragEnd = (event: DragEvent) => {
      const target = event.target as HTMLElement;
      target.style.opacity = '1';
      setDraggedItem(null);
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        const target = event.target as HTMLElement;
        if (draggedItem && target) {
          const text1 = draggedItem.textContent || '';
          const text2 = target.textContent || '';
          target.textContent = text2 + ' and ' + text1;
          draggedItem.textContent = null
          setCombinedText(text2 + ' and ' + text1);
        }
    };

    const items = document.querySelectorAll('.item');
    items.forEach((item: any) => {
      item.addEventListener('dragstart', handleDragStart);
      item.addEventListener('dragend', handleDragEnd);
      item.addEventListener('dragover', handleDragOver);
      item.addEventListener('drop', handleDrop);
    });

    return () => {
      items.forEach((item: any) => {
        item.removeEventListener('dragstart', handleDragStart);
        item.removeEventListener('dragend', handleDragEnd);
        item.removeEventListener('dragover', handleDragOver);
        item.removeEventListener('drop', handleDrop);
      });
    };
  }, [draggedItem]);

  return (
    <div>
      <div className="item" draggable>{text1}</div>
      <div className="item" draggable>{text2}</div>
      {/* <div className="item" draggable>{combinedText}</div> */}
      <input type="text" value={text1} onChange={event => setText1(event.target.value)} />
      <input type="text" value={text2} onChange={event => setText2(event.target.value)} />
    </div>
  );
};

export default DragAndDrop;

