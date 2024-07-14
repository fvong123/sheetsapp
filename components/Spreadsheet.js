// components/Spreadsheet.js
'use client';

import { memo, useCallback, useMemo } from 'react';
import Cell from './Cell';

const Spreadsheet = memo(({
  rows,
  cols,
  cellData,
  onCellSelect,
  selectedCell,
  isFormulaMode,
  updateCellData,
}) => {
  const handleCellClick = useCallback((cellId) => {
    onCellSelect(cellId);
  }, [onCellSelect]);

  const getColumnLabel = useCallback((index) => {
    let label = '';
    while (index >= 0) {
      label = String.fromCharCode((index % 26) + 65) + label;
      index = Math.floor(index / 26) - 1;
    }
    return label;
  }, []);

  const headerCells = useMemo(() => (
    Array.from({ length: cols }).map((_, colIndex) => (
      <th key={colIndex} className="sticky top-0 z-10 bg-gray-100 border border-gray-200 p-2 h-8 min-w-[100px] text-center font-bold">
        {getColumnLabel(colIndex)}
      </th>
    ))
  ), [cols, getColumnLabel]);

  const rowCells = useMemo(() => (
    Array.from({ length: rows }).map((_, rowIndex) => (
      <tr key={rowIndex}>
        <td className="sticky left-0 z-10 bg-gray-100 border border-gray-200 p-2 h-8 w-12 text-center font-bold">
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
              onClick={handleCellClick}
              isFormulaMode={isFormulaMode}
              updateCellData={updateCellData}
            />
          );
        })}
      </tr>
    ))
  ), [rows, cols, cellData, selectedCell, handleCellClick, isFormulaMode, updateCellData]);

  return (
    <div className="border border-gray-200 p-4">
      <div className="overflow-auto border border-gray-200 max-h-[400px] max-w-full">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="sticky top-0 left-0 z-20 bg-gray-100 border border-gray-200 p-2 h-8 w-12 text-center font-bold">
                {/* Corner cell */}
              </th>
              {headerCells}
            </tr>
          </thead>
          <tbody>
            {rowCells}
          </tbody>
        </table>
      </div>
    </div>
  );
});

Spreadsheet.displayName = 'Spreadsheet';

export default Spreadsheet;