// components/Cell.js
"use client";

import { memo, useCallback, useState, useRef, useEffect } from "react";

const Cell = memo(
  ({
    id,
    data,
    isSelected,
    onClick,
    isEditMode,
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
      border border-gray-200 p-0.5 h-5 w-16 bg-white text-[10px]
      ${isSelected && isEditMode ? "outline outline-2 outline-blue-500" : ""}
      ${isFormulaReference && isEditMode ? "outline outline-2 outline-red-500" : ""}
      ${isSelected && !isEditMode ? "outline outline-2 outline-blue-500" : ""}
    `;

    const handleClick = useCallback(() => {
      onClick(id);
    }, [onClick, id]);

    const handleDoubleClick = useCallback(() => {
      if (!isEditMode) {
        setIsEditing(true);
      }
    }, [isEditMode]);

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
        } else if (e.key === "Escape") {
          setIsEditing(false);
          setEditValue(data?.value || "");
        }
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
            className="w-full h-full outline-none bg-transparent text-[10px]"
          />
        ) : (
          <div className="w-full h-full overflow-hidden text-[10px]">
            {data?.displayValue || data?.value || ""}
          </div>
        )}
      </td>
    );
  },
);

Cell.displayName = "Cell";

export default Cell;