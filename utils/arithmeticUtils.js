// utils/arithmeticUtils.js

export function evaluateArithmetic(formula, cellData) {
  // Replace cell references with their values
  const formulaWithValues = formula.replace(/[A-Z]+[0-9]+/g, (match) => {
    const cellId = cellReferenceToId(match);
    const cellValue = cellData[cellId]?.value;
    if (cellValue === undefined) {
      throw new Error(`Cell ${match} not found`);
    }
    // If the cell value is a number, return it directly
    if (typeof cellValue === "number") {
      return cellValue.toString();
    }
    // If the cell value is a formula, evaluate it recursively
    if (typeof cellValue === "string" && cellValue.startsWith("=")) {
      return evaluateArithmetic(cellValue.slice(1), cellData);
    }
    // If it's a string, return it wrapped in quotes
    return `"${cellValue}"`;
  });

  // Evaluate the formula
  try {
    return Function(`'use strict'; return (${formulaWithValues})`)();
  } catch (error) {
    throw new Error("Invalid formula");
  }
}

export function extractCellReferences(formula) {
  const regex = /[A-Z]+[0-9]+/g;
  return (formula.match(regex) || []).filter(
    (ref, index, self) => self.indexOf(ref) === index,
  );
}

export function idToCellReference(id) {
  const [row, col] = id.split("-").map(Number);
  let columnName = "";
  let columnNumber = col + 1;
  while (columnNumber > 0) {
    columnNumber--;
    columnName = String.fromCharCode(65 + (columnNumber % 26)) + columnName;
    columnNumber = Math.floor(columnNumber / 26);
  }
  return `${columnName}${row + 1}`;
}

export function cellReferenceToId(ref) {
  const match = ref.match(/([A-Z]+)([0-9]+)/);
  if (!match) {
    throw new Error("Invalid cell reference");
  }
  const [, col, row] = match;
  let columnNumber = 0;
  for (let i = 0; i < col.length; i++) {
    columnNumber = columnNumber * 26 + col.charCodeAt(i) - 64;
  }
  return `${parseInt(row) - 1}-${columnNumber - 1}`;
}
