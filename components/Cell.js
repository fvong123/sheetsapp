import { memo, useCallback, useState, useRef, useEffect } from "react";

const Cell = memo(
  ({
    id,
    data,
    formatting,
    isSelected,
    onClick,
    isEditMode,
    isFormulaReference,
    isCurrentFormulaCell,
    updateCellData,
    rowData,
    columnIndex,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    width,
    currentInput,  // Add this new prop
    selectedCell,  // Add this new prop
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

    const cellStyle = {
      backgroundColor:
        formatting?.backgroundColor !== "default"
          ? formatting?.backgroundColor
          : undefined,
      color: formatting?.color !== "default" ? formatting?.color : undefined,
      fontWeight: formatting?.fontWeight || undefined,
      fontStyle: formatting?.fontStyle || undefined,
      textDecoration: formatting?.textDecoration || undefined,
      borderLeft:
        formatting?.leftBorder === "black" ? "1px solid black" : undefined,
      borderRight:
        formatting?.rightBorder === "black" ? "1px solid black" : undefined,
      borderTop:
        formatting?.topBorder === "black" ? "1px solid black" : undefined,
      borderBottom:
        formatting?.bottomBorder === "black" ? "1px solid black" : undefined,
      width: `${width}px`,
      maxWidth: `${width}px`, // Add this line to prevent cell from expanding
      minWidth: `${width}px`, // Add this line to prevent shrinking
      overflow: 'hidden', // Ensure content doesn't overflow
    };

    const cellClasses = `
      border border-gray-200 p-0.5 h-5 bg-white text-[10px]
      ${isSelected ? "outline outline-2 outline-blue-500" : ""}
      ${isFormulaReference && isEditMode ? "outline outline-2 outline-red-500" : ""}
      ${isCurrentFormulaCell ? "outline outline-2 outline-orange-500" : ""}
      whitespace-nowrap overflow-hidden text-ellipsis
    `;

    const handleClick = useCallback(() => {
      onClick(id);
    }, [onClick, id]);

    const handleMouseDown = useCallback((e) => {
      e.preventDefault();
      onMouseDown(id);
    }, [onMouseDown, id]);

    const handleMouseEnter = useCallback(() => {
      onMouseEnter(id);
    }, [onMouseEnter, id]);

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
          const stringValue = editValue.toString();
          const isFormula = stringValue.startsWith("=");
          updateCellData(id, stringValue, isFormula);
          setIsEditing(false);
          setEditValue(""); // Reset the edit value
        } else if (e.key === "Escape") {
          setIsEditing(false);
          setEditValue(data?.value?.toString() || "");
        }
      },
      [id, editValue, updateCellData, data],
    );

    return (
      <td
        className={cellClasses}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseUp={onMouseUp}
        style={cellStyle}
      >
        {isEditing || (isSelected && selectedCell === id) ? (
          <input
            ref={inputRef}
            type="text"
            value={isSelected && selectedCell === id ? currentInput : editValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full h-full outline-none bg-transparent text-[10px]"
            style={cellStyle}
          />
        ) : (
          <div className="w-full h-full truncate text-[10px]">
            {data?.displayValue || data?.value || ""}
          </div>
        )}
      </td>
    );
  },
);

Cell.displayName = "Cell";

export default Cell;