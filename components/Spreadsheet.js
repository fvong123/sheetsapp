// components/Spreadsheet.js
"use client";

import { memo, useCallback, useMemo } from "react";
import Cell from "./Cell";

const Spreadsheet = memo(
  ({
    rows,
    cols,
    cellData,
    onCellSelect,
    selectedCell,
    isFormulaMode,
    updateCellData,
    formulaReferences,
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

    const rowCells = useMemo(
      () =>
        Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            <td className="sticky left-0 z-10 bg-gray-100 border border-gray-200 p-1 h-4 w-6 text-center font-bold text-[10px]">
              {rowIndex + 1}
            </td>
            {Array.from({ length: cols }).map((_, colIndex) => {
              const cellId = `${rowIndex}-${colIndex}`;
              return (
                <Cell
                  key={cellId}
                  id={cellId}
                  data={cellData[cellId]}
                  isSelected={cellId === selectedCell}
                  isFormulaMode={isFormulaMode}
                  isFormulaReference={formulaReferences.includes(cellId)}
                  onClick={handleCellClick}
                  updateCellData={updateCellData}
                  rowData={Array.from({ length: cols }).map(
                    (_, colIdx) => cellData[`${rowIndex}-${colIdx}`],
                  )}
                  columnIndex={colIndex}
                />
              );
            })}
          </tr>
        )),
      [
        rows,
        cols,
        cellData,
        selectedCell,
        isFormulaMode,
        formulaReferences,
        handleCellClick,
        updateCellData,
      ],
    );

    return (
      <div className="border border-gray-200 p-1">
        <div className="overflow-auto border border-gray-200 max-h-[calc(50vh-2rem)] max-w-full">
          <table className="border-collapse w-full">
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
