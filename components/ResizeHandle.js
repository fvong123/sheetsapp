import { useState, useCallback, useEffect } from 'react';

const ResizeHandle = ({ onResize, isColumn }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [startPosition, setStartPosition] = useState(0);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsResizing(true);
    setStartPosition(isColumn ? e.clientX : e.clientY);
  }, [isColumn]);

  const handleMouseMove = useCallback((e) => {
    if (isResizing) {
      const currentPosition = isColumn ? e.clientX : e.clientY;
      const delta = currentPosition - startPosition;
      onResize(delta);
      setStartPosition(currentPosition);
    }
  }, [isResizing, onResize, startPosition, isColumn]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div
      className={`absolute ${isColumn ? 'cursor-col-resize right-0 top-0 w-1 h-full' : 'cursor-row-resize bottom-0 left-0 w-full h-1'}`}
      onMouseDown={handleMouseDown}
    />
  );
};

export default ResizeHandle;