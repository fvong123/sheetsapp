// components/FormulaBar.js
"use client";

// components/FormulaBar.js
import React, { useCallback, useEffect, forwardRef } from "react";

const FormulaBar = forwardRef(
  ({ value, onChange, onSubmit, onCancel, isFormulaMode }, ref) => {
    useEffect(() => {
      if (isFormulaMode && ref && ref.current) {
        ref.current.focus();
      }
    }, [isFormulaMode, ref]);

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
          className="input input-bordered w-full"
          placeholder="Enter formula or value"
        />
      </div>
    );
  },
);

FormulaBar.displayName = "FormulaBar";

export default FormulaBar;
