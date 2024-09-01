// components/Spreadsheet.js
"use client";

import { memo, useCallback, useMemo, useState, useRef, useEffect } from "react";
import Cell from "./Cell";
import ResizeHandle from "./ResizeHandle";

const MIN_COLUMN_WIDTH = 64;
const MAX_COLUMN_WIDTH = 800;
const DEFAULT_COLUMN_WIDTH = 200;

const Spreadsheet = memo(
  ({
    rows,
    cols,
    cellData,
    cellFormatting,
    onCellSelect,
    selectedCells,
    isEditMode,
    updateCellData,
    formulaReferences,
    currentFormulaCell,
    checkData,
    cellErrors,
    onSelectionStart,
    onSelectionMove,
    onSelectionEnd,
    onColumnWidthsChange,
    initialColumnWidths, // Add this prop
  }) => {
    const [columnWidths, setColumnWidths] = useState(
      initialColumnWidths || Array(cols).fill(DEFAULT_COLUMN_WIDTH)
    );
    const containerRef = useRef(null);

    // Add this useEffect to update columnWidths when initialColumnWidths changes
    useEffect(() => {
      if (initialColumnWidths) {
        setColumnWidths(initialColumnWidths);
      }
    }, [initialColumnWidths]);

    const handleColumnResize = useCallback((columnIndex, delta) => {
      setColumnWidths((prevWidths) => {
        const newWidths = [...prevWidths];
        newWidths[columnIndex] = Math.max(
          MIN_COLUMN_WIDTH,
          Math.min(MAX_COLUMN_WIDTH, newWidths[columnIndex] + delta)
        );
        onColumnWidthsChange(newWidths);
        return newWidths;
      });
    }, [onColumnWidthsChange]);

    useEffect(() => {
      const handleMouseMove = (e) => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const isNearRightEdge = e.clientX > rect.right - 20;
          if (isNearRightEdge) {
            containerRef.current.scrollLeft += 10;
          }
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);

    const handleCellClick = useCallback(
      (cellId) => {
        onCellSelect(cellId);
      },
      [onCellSelect],
    );

    const getColumnLabel = useCallback((index) => {
      let label = "";
      while (index >= 0) {
        label = String.fromCharCode((index % 26) + 65) + label;
        index = Math.floor(index / 26) - 1;
      }
      return label;
    }, []);

    const headerCells = useMemo(
      () =>
        Array.from({ length: cols }).map((_, colIndex) => (
          <th
            key={colIndex}
            className="sticky top-0 z-10 bg-gray-100 border border-gray-200 p-1 h-4 text-center font-bold text-[10px] relative"
            style={{ width: `${columnWidths[colIndex]}px` }}
          >
            {getColumnLabel(colIndex)}
            <ResizeHandle
              onResize={(delta) => handleColumnResize(colIndex, delta)}
              isColumn={true}
            />
          </th>
        )),
      [cols, getColumnLabel, columnWidths, handleColumnResize]
    );

    const handleMouseDown = useCallback((cellId) => {
      onSelectionStart(cellId);
    }, [onSelectionStart]);

    const handleMouseEnter = useCallback((cellId) => {
      onSelectionMove(cellId);
    }, [onSelectionMove]);

    const handleMouseUp = useCallback(() => {
      onSelectionEnd();
    }, [onSelectionEnd]);

    const rowCells = useMemo(
      () =>
        Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            <td className="sticky left-0 z-10 bg-gray-100 border border-gray-200 p-1 h-4 w-6 text-center font-bold text-[10px]">
              {rowIndex + 1}
            </td>
            {Array.from({ length: cols }).map((_, colIndex) => {
              const cellId = `${rowIndex}-${colIndex}`;
              const isSelected = selectedCells.includes(cellId);
              const isFormulaReference = formulaReferences.includes(cellId);
              const isCheckCell = cellId in checkData;
              const cellError = cellErrors[cellId];

              return (
                <Cell
                  key={cellId}
                  id={cellId}
                  data={cellData[cellId]}
                  formatting={cellFormatting[cellId]}
                  isSelected={isSelected}
                  isEditMode={isEditMode}
                  isFormulaReference={isFormulaReference}
                  isCurrentFormulaCell={cellId === currentFormulaCell}
                  onClick={onCellSelect}
                  updateCellData={updateCellData}
                  rowData={Array.from({ length: cols }).map(
                    (_, colIdx) => cellData[`${rowIndex}-${colIdx}`],
                  )}
                  columnIndex={colIndex}
                  isCheckCell={isCheckCell}
                  cellError={cellError}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseUp={handleMouseUp}
                  width={columnWidths[colIndex]}
                />
              );
            })}
          </tr>
        )),
      [
        rows,
        cols,
        cellData,
        cellFormatting,
        selectedCells,
        isEditMode,
        formulaReferences,
        currentFormulaCell,
        onCellSelect,
        updateCellData,
        checkData,
        cellErrors,
        handleMouseDown,
        handleMouseEnter,
        handleMouseUp,
        columnWidths,
      ]
    );

    return (
      <div className="h-full overflow-hidden border border-gray-200 p-1">
        <div
          ref={containerRef}
          className="h-full overflow-auto border border-gray-200"
          style={{ maxWidth: '100%' }}
          onMouseUp={handleMouseUp}
        >
          <table className="border-collapse table-fixed">
            <thead>
              <tr>
                <th className="sticky top-0 left-0 z-20 bg-gray-100 border border-gray-200 p-1 h-5 w-6 text-center font-bold text-[10px]">
                  {/* Corner cell */}
                </th>
                {headerCells}
              </tr>
            </thead>
            <tbody>{rowCells}</tbody>
          </table>
        </div>
      </div>
    );
  },
);

Spreadsheet.displayName = "Spreadsheet";

export default Spreadsheet;