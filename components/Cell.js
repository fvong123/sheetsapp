// components/Cell.js
"use client";

import { memo, useCallback, useState, useRef, useEffect } from "react";

const Cell = memo(
  ({
    id,
    data,
    isSelected,
    onClick,
    isFormulaMode,
    isFormulaReference,
    updateCellData,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(data?.value || "");
    const inputRef = useRef(null);

    useEffect(() => {
      if (isEditing) {
        inputRef.current?.focus();
      }
    }, [isEditing]);

    useEffect(() => {
      setEditValue(data?.value || "");
    }, [data?.value]);

    const cellClasses = `
      border border-gray-200 p-1 h-6 w-24 bg-white text-xs
      ${isSelected && isFormulaMode ? "outline outline-2 outline-blue-500" : ""}
      // ${isFormulaReference && isFormulaMode ? "outline outline-2 outline-red-500" : ""}
      ${isSelected && !isFormulaMode ? "outline outline-2 outline-blue-500" : ""}
    `;

    const handleClick = useCallback(() => {
      onClick(id);
    }, [onClick, id]);

    const handleDoubleClick = useCallback(() => {
      if (!isFormulaMode) {
        setIsEditing(true);
      }
    }, [isFormulaMode]);

    const handleChange = useCallback((e) => {
      setEditValue(e.target.value);
    }, []);

    const handleBlur = useCallback(() => {
      if (isEditing) {
        const isFormula = editValue.startsWith("=");
        updateCellData(id, editValue, isFormula);
        setIsEditing(false);
      }
    }, [id, editValue, updateCellData, isEditing]);

    const handleKeyDown = useCallback(
      (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleBlur();
          console.log("cell enter");
        } else if (e.key === "Escape") {
          setIsEditing(false);
          setEditValue(data?.value || "");
        }
        // Remove any handling of arrow keys here
      },
      [handleBlur, data],
    );

    return (
      <td
        className={cellClasses}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full h-full outline-none bg-transparent text-xs"
          />
        ) : (
          <div className="w-full h-full overflow-hidden text-xs">
            {data?.displayValue || data?.value || ""}
          </div>
        )}
      </td>
    );
  },
);

Cell.displayName = "Cell";

export default Cell;
