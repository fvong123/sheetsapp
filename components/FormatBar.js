// components/FormatBar.js
import { memo, useCallback } from "react";

const FormatBar = memo(({ onFormatChange }) => {
  const handleBackgroundColor = useCallback(
    (e) => {
      onFormatChange({ backgroundColor: e.target.value });
    },
    [onFormatChange],
  );

  const handleFontColor = useCallback(
    (e) => {
      onFormatChange({ color: e.target.value });
    },
    [onFormatChange],
  );

  const handleBorder = useCallback(
    (position) => {
      onFormatChange({ [`border${position}`]: true });
    },
    [onFormatChange],
  );

  return (
    <div className="mb-2 flex space-x-2">
      <input
        type="color"
        onChange={handleBackgroundColor}
        className="h-8 w-8"
        title="Background Color"
      />
      <input
        type="color"
        onChange={handleFontColor}
        className="h-8 w-8"
        title="Font Color"
      />
      <button
        onClick={() => handleBorder("Top")}
        className="px-2 py-1 bg-gray-200 rounded"
        title="Top Border"
      >
        ▲
      </button>
      <button
        onClick={() => handleBorder("Right")}
        className="px-2 py-1 bg-gray-200 rounded"
        title="Right Border"
      >
        ▶
      </button>
      <button
        onClick={() => handleBorder("Bottom")}
        className="px-2 py-1 bg-gray-200 rounded"
        title="Bottom Border"
      >
        ▼
      </button>
      <button
        onClick={() => handleBorder("Left")}
        className="px-2 py-1 bg-gray-200 rounded"
        title="Left Border"
      >
        ◀
      </button>
    </div>
  );
});

export default FormatBar;
