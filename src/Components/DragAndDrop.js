import React, { useRef, useEffect, useState } from 'react';

function TextBox() {
  var text = string;
  var x= number;
  var y= number;
}

const DragAndDrop = () => {
  const canvasRef = useRef(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [textBoxes, setTextBoxes] = useState<TextBox()>([{ text: '', x: 10, y: 50 }]);

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
        textBoxes.forEach(textBox => {
          context.fillText(textBox.text, textBox.x, textBox.y);
          context.strokeRect(textBox.x - 5, textBox.y - 15, context.measureText(textBox.text).width + 10, 20);
        });
      }
    }
  }, [textBoxes]);

  useEffect(() => {
    const handleDragStart = event => {
      const target = event.target;
      setDraggedItem(target);
      target.style.opacity = '0.4';
    };

    const handleDragEnd = event => {
      const target = event.target;
      target.style.opacity = '1';
      setDraggedItem(null);
    };

    const handleDragOver = event => {
      event.preventDefault();
    };

    const handleDrop = event => {
      event.preventDefault();
      const target = event.target;
      if (draggedItem && target) {
        const index1 = Number(draggedItem.dataset.index);
        const index2 = Number(target.dataset.index);
        const text1 = draggedItem.textContent || '';
        const text2 = target.textContent || '';
        const newTextBoxes = [...textBoxes];
        newTextBoxes.splice(index1, 1, { text: text1 + text2, x: textBoxes[index1].x, y: textBoxes[index1].y });
        newTextBoxes.splice(index2, 1);
        setTextBoxes(newTextBoxes);
      }
    };

    const items = document.querySelectorAll('.item');
    items.forEach(item => {
      item.addEventListener('dragstart', handleDragStart);
      item.addEventListener('dragend', handleDragEnd);
      item.addEventListener('dragover', handleDragOver);
      item.addEventListener('drop', handleDrop);
    });

    return () => {
      items.forEach(item => {
        item.removeEventListener('dragstart', handleDragStart);
        item.removeEventListener('dragend', handleDragEnd);
        item.removeEventListener('dragover', handleDragOver);
        item.removeEventListener('drop', handleDrop);
      });
    };
  }, [draggedItem, textBoxes]);

  const handleTextChange = (event, index) => {
    const newTextBoxes = [...textBoxes];
    newTextBoxes[index] = { text: event.target.value, x: textBoxes[index].x, y: textBoxes[index].y };
    setTextBoxes(newTextBoxes);
  };

  const handleMouseDown = (event, index) => {
    const element = event.target;
    setDraggedItem(element);
    element.style.cursor = 'move';
  };

  const handleMouseUp = (event, index) => {
    const element = event.target;
    element.style.cursor = 'default';
    const newTextBoxes = [...textBoxes];
    newTextBoxes[index] = { text: element.textContent || '', x: event.clientX - canvasRef.current.offsetLeft, y: event.clientY - canvasRef.current.offsetTop };
    setTextBoxes(newTextBoxes);
    setDraggedItem(null);
  };

  return (
    <div>
      <canvas ref={canvasRef} width={300} height={300}>
        {textBoxes.map((textBox, index) => (
          <div key={index} className="item" draggable data-index={index} onMouseDown={event => handleMouseDown(event, index)} onMouseUp={event => handleMouseUp(event, index)}>{textBox.text}</div>
        ))}
      </canvas>
      {textBoxes.map((textBox, index) => (
        <input key={index} type="text" value={textBox.text} onChange={event => handleTextChange(event, index)} />
      ))}
      <button onClick={() => setTextBoxes([...textBoxes, { text: '', x: 10, y: 50 }])}>Add Text Box</button>
    </div>
  );
};

export default DragAndDrop;

