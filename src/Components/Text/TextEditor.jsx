import React from 'react';
import { Html } from 'react-konva-utils';

function getStyle(width, height) {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  const baseStyle = {
    width: `${width}px`,
    height: `${height}px`,
    border: "none",
    padding: "0px",
    margin: "0px",
    background: "none",
    outline: "none",
    resize: "none",
    colour: "#ffffff",
    fontSize: "16px",
    fontFamily: "sans-serif"
  };
  if (isFirefox) {
    return baseStyle;
  }
  return {
    ...baseStyle,
    margintop: "-4px"
  };
}

export const TextEditor = ({
  x,
  y,
  width,
  height,
  textNodeRef,
  value, 
  onChange,
  onKeyDown,
  onKeyUp,
  onBlur,
  onClick,
  onDoubleClick
}) => {
  // const [style, setStyle] = React.useState();
  // React.useLayoutEffect(() => {
  //   const textNode = textNodeRef.current;
  //   // apply many styles to match text on canvas as close as possible
  //   // remember that text rendering on canvas and on the textarea can be different
  //   // and sometimes it is hard to make it 100% the same. But we will try...
  //   const newStyle = {};
  //   newStyle.width = width - textNode.padding() * 2 + 'px';
  //   newStyle.height = height - textNode.padding() * 2 + 10 + 'px';
  //   newStyle.fontSize = '16px';
  //   newStyle.border = 'none';
  //   newStyle.padding = '0px';
  //   newStyle.overflow = 'hidden';
  //   newStyle.background = 'none';
  //   newStyle.outline = 'none';
  //   newStyle.resize = 'none';
  //   newStyle.lineHeight = textNode.lineHeight() + 0.01;
  //   newStyle.fontFamily = 'sans-serif';
  //   newStyle.transformOrigin = 'left top';
  //   newStyle.textAlign = textNode.align();
  //   newStyle.color = '#ffffff';
  //   newStyle.overflowWrap = 'break-word';
  //   newStyle.whiteSpace = 'normal';
  //   newStyle.userSelect = 'text';
  //   newStyle.wordBreak = 'normal';

  //   if (JSON.stringify(newStyle) !== JSON.stringify(style)) {
  //     setStyle(newStyle);
  //   }
  // });
  const style = getStyle(width, height);

  return (
    <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
      <textarea
        className="polotno-input"
        style={style}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
        // onClick={onClick}
        // onDoubleClick={onDoubleClick}
      />
    </Html>
  );
};