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

    const shouldWrap =
      columnIndex < rowData.length - 1 && !rowData[columnIndex + 1]?.value;

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
    };

    const cellClasses = `
      border border-gray-200 p-0.5 h-5 w-16 bg-white text-[10px]
      ${isSelected && isEditMode ? "outline outline-2 outline-blue-500" : ""}
      ${isFormulaReference && isEditMode ? "outline outline-2 outline-red-500" : ""}
      ${isSelected && !isEditMode ? "outline outline-2 outline-blue-500" : ""}
      ${isCurrentFormulaCell ? "outline outline-2 outline-orange-500" : ""}
      ${shouldWrap ? "whitespace-normal overflow-hidden" : "whitespace-nowrap overflow-hidden text-ellipsis"}
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
        style={cellStyle}
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
            style={cellStyle}
          />
        ) : (
          <div
            className={`w-full h-full ${shouldWrap ? "break-words" : "truncate"} text-[10px]`}
          >
            {data?.displayValue || data?.value || ""}
          </div>
        )}
      </td>
    );
  },
);

Cell.displayName = "Cell";

export default Cell;