"use client";

import React, { forwardRef, useEffect, useRef } from "react";

const FormulaBar = forwardRef(
  (
    {
      value,
      onChange,
      onSubmit,
      onCancel,
      isEditMode,
      focusFormulaBar,
      setFocusFormulaBar,
    },
    ref,
  ) => {
    const inputRef = useRef(null);

    useEffect(() => {
      if (focusFormulaBar && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(value.length, value.length);
        setFocusFormulaBar(false);
      }
    }, [focusFormulaBar, setFocusFormulaBar, value]);

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onSubmit();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
      }
    };

    return (
      <div className="flex items-center bg-white border border-gray-300 p-1">
        <span className="mr-2 font-bold">=</span>
        <input
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          type="text"
          className="flex-grow outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          readOnly={!isEditMode}
        />
      </div>
    );
  },
);

FormulaBar.displayName = "FormulaBar";

export default FormulaBar;
