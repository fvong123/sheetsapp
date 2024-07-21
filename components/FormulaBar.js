"use client";

import React, { useCallback, useEffect, forwardRef } from "react";

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
    useEffect(() => {
      if (focusFormulaBar && ref && ref.current) {
        ref.current.focus();
        setFocusFormulaBar(false);
      }
    }, [focusFormulaBar, ref, setFocusFormulaBar]);

    const handleKeyDown = useCallback(
      (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSubmit();
        } else if (e.key === "Escape") {
          e.preventDefault();
          onCancel();
        }
      },
      [onSubmit, onCancel],
    );

    return (
      <div className="mb-2">
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input input-bordered w-full h-8 rounded-none"
          placeholder={"Enter value or formula"}
        />
      </div>
    );
  },
);

FormulaBar.displayName = "FormulaBar";

export default FormulaBar;
