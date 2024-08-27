// components/Spreadsheet.js
"use client";

import { memo, useCallback, useMemo } from "react";
import Cell from "./Cell";

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
  }) => {
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
            className="sticky top-0 z-10 bg-gray-100 border border-gray-200 p-1 h-4 w-16 min-w-[64px] text-center font-bold text-[10px]"
          >
            {getColumnLabel(colIndex)}
          </th>
        )),
      [cols, getColumnLabel],
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
      ],
    );

    return (
      <div className="h-full overflow-hidden border border-gray-200 p-1">
        <div
          className="h-full overflow-auto border border-gray-200 max-w-full"
          onMouseUp={handleMouseUp}
        >
          <table className="border-collapse w-full h-full table-fixed">
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