// components/FormulaBar.js
"use client";

import { useCallback, useRef, useEffect } from "react";

const FormulaBar = ({ value, onChange, onSubmit, onCancel, isFormulaMode }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isFormulaMode) {
      inputRef.current?.focus();
    }
  }, [isFormulaMode]);

  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onSubmit();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
      }
      // We're not preventing default for other keys,
      // allowing normal behavior for Backspace and Delete
    },
    [onSubmit, onCancel],
  );

  return (
    <div className="mb-2">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="input input-bordered w-full"
        placeholder="Enter formula or value"
      />
    </div>
  );
};

export default FormulaBar;
