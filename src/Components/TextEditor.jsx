import React from 'react';
import { Html } from 'react-konva-utils';

export const TextEditor = ({
  x,
  y,
  textNodeRef,
  value,
  onBlur,
  onChange,
  onKeyDown,
  onKeyUp,
  onClick,
  onDoubleClick
}) => {
  const [style, setStyle] = React.useState();
  React.useLayoutEffect(() => {
    const textNode = textNodeRef.current;
    // apply many styles to match text on canvas as close as possible
    // remember that text rendering on canvas and on the textarea can be different
    // and sometimes it is hard to make it 100% the same. But we will try...
    const newStyle = {};
    newStyle.width = textNode.width() - textNode.padding() * 2 + 'px';
    newStyle.height = textNode.height() - textNode.padding() * 2 + 10 + 'px';
    newStyle.fontSize = textNode.fontSize() + 'px';
    newStyle.border = 'none';
    newStyle.padding = '0px';
    newStyle.overflow = 'hidden';
    newStyle.background = 'none';
    newStyle.outline = 'none';
    newStyle.resize = 'none';
    newStyle.lineHeight = textNode.lineHeight() + 0.01;
    newStyle.fontFamily = textNode.fontFamily();
    newStyle.transformOrigin = 'left top';
    newStyle.textAlign = textNode.align();
    newStyle.color = textNode.fill();
    newStyle.overflowWrap = 'break-word';
    newStyle.whiteSpace = 'normal';
    newStyle.userSelect = 'text';
    newStyle.wordBreak = 'normal';

    if (JSON.stringify(newStyle) !== JSON.stringify(style)) {
      setStyle(newStyle);
    }
  });
  // React.useEffect((e) => {
  //   onChange({
  //     ...textProps,
  //     text: e.currentTarget.value,
  //   });
  // });

  return (
    <Html groupProps={{ x, y }} divProps={{ style: { opacity: 0.83 } }}>
      <textarea
        className="polotno-input"
        style={{
          ...style,
        }}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      />
    </Html>
  );
};