import React, { useRef, useEffect, useState } from 'react';

const DragAndDrop = () => {
  const [draggedItem, setDraggedItem] = useState(null);


  useEffect(() => {
    const handleDragStart = (event) => {
      const target = event.target;
      setDraggedItem(target);
      target.style.opacity = '0.4';
    };

    const handleDragEnd = (event) => {
      const target = event.target;
      target.style.opacity = '1';
      setDraggedItem(null);
    };

    const handleDragOver = (event) => {
      event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const target = event.target;
        if (draggedItem && target) {
          const text1 = draggedItem.textContent || '';
          const text2 = target.textContent || '';
          target.textContent = text2 + ' and ' + text1;
          draggedItem = null
        }
    };

    const items = document.querySelectorAll('.item');
    items.forEach((item) => {
      item.addEventListener('dragstart', handleDragStart);
      item.addEventListener('dragend', handleDragEnd);
      item.addEventListener('dragover', handleDragOver);
      item.addEventListener('drop', handleDrop);
    });

    return () => {
      items.forEach((item) => {
        item.removeEventListener('dragstart', handleDragStart);
        item.removeEventListener('dragend', handleDragEnd);
        item.removeEventListener('dragover', handleDragOver);
        item.removeEventListener('drop', handleDrop);
      });
    };
  }, [draggedItem]);

  return (
    <div>
      <div className="item" draggable>text1</div>
      <div className="item" draggable>text2</div>
      {/* <div className="item" draggable>{combinedText}</div> */}
    </div>
  );
};

export default DragAndDrop;