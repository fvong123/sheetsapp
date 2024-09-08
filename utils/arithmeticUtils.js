// utils/arithmeticUtils.js

export function evaluateArithmetic(formula, cellData) {
  console.log("Original formula:", formula);

  const cellRefRegex = /[A-Z]+[0-9]+/g;
  let processedFormula = formula.replace(cellRefRegex, (match) => {
    const cellId = cellReferenceToId(match);
    const cellValue = cellData[cellId]?.value;
    if (cellValue === undefined) {
      throw new Error(`Cell ${match} not found`);
    }
    if (typeof cellValue === 'string' && cellValue.startsWith('=')) {
      return evaluateArithmetic(cellValue.slice(1), cellData);
    }
    return !isNaN(cellValue) ? Number(cellValue) : `"${cellValue}"`;
  });

  console.log("After cell reference replacement:", processedFormula);

  if (/^\s*\d+(\.\d+)?%\s*$/.test(processedFormula)) {
    console.log("Handling standalone percentage");
    return parseFloat(processedFormula) / 100;
  }

  processedFormula = processedFormula.replace(/(\d+(\.\d+)?)%/g, (match, p1) => `(${p1}/100)`);

  console.log("After percentage handling:", processedFormula);

  try {
    let result;
    if (/^[\d\s\+\-\*\/\(\)\.\^]+$/.test(processedFormula)) {
      console.log("Using JavaScript eval for basic arithmetic");
      // Use JavaScript's eval for basic arithmetic (including exponentiation)
      result = eval(processedFormula.replace('^', '**'));
    } else {
      console.log("Using math.js for complex expressions");
      const math = require('mathjs');
      result = math.evaluate(processedFormula);
    }
    console.log("Evaluation result:", result);
    return result;
  } catch (error) {
    console.error("Formula evaluation error:", error);
    throw new Error(`Invalid formula: ${error.message}`);
  }
}

export function processInput(input) {
  console.log("Processing input:", input); // Debug log

  // Handle non-string inputs
  if (typeof input !== 'string') {
    return { value: input, displayValue: input.toString() };
  }

  // Handle percentages
  if (input.endsWith('%')) {
    const numValue = parseFloat(input) / 100;
    console.log("Processed percentage:", { value: numValue, displayValue: input }); // Debug log
    return { value: numValue.toFixed(10), displayValue: input };
  }

  // Handle numbers and decimals
  const numValue = parseFloat(input);
  if (!isNaN(numValue) && input.trim() === numValue.toString()) {
    console.log("Processed number:", { value: numValue, displayValue: input }); // Debug log
    return { value: numValue.toFixed(10), displayValue: input };
  }

  // Handle other inputs (text, symbols, etc.)
  console.log("Processed as text:", { value: input, displayValue: input }); // Debug log
  return { value: input, displayValue: input };
}

export function formatResult(result) {
  console.log("Formatting result:", result); // Debug log
  if (typeof result === 'number' || !isNaN(result)) {
    // Format number with up to 10 decimal places, removing trailing zeros
    const formattedResult = Number(parseFloat(result).toFixed(10)).toString();
    console.log("Formatted as number:", formattedResult); // Debug log
    return formattedResult;
  }
  console.log("Formatted as string:", result.toString()); // Debug log
  return result.toString();
}

export function extractCellReferences(formula) {
  if (typeof formula !== 'string') {
    return [];
  }
  const regex = /[A-Z]+[0-9]+/g;
  return (formula.match(regex) || []).filter(
    (ref, index, self) => self.indexOf(ref) === index,
  );
}

export function extractPartialCellReferences(formula) {
  if (typeof formula !== 'string') {
    return [];
  }
  const regex = /[A-Z]+[0-9]*$/;
  const match = formula.match(regex);
  return match ? [match[0]] : [];
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

export function isValidCellReference(ref) {
  return /^[A-Z]+[0-9]+$/.test(ref);
}

export function getAdjacentCellReference(ref, direction) {
  const [col, row] = cellReferenceToId(ref).split("-").map(Number);
  switch (direction) {
    case "up":
      return idToCellReference(`${Math.max(0, row - 1)}-${col}`);
    case "down":
      return idToCellReference(`${row + 1}-${col}`);
    case "left":
      return idToCellReference(`${row}-${Math.max(0, col - 1)}`);
    case "right":
      return idToCellReference(`${row}-${col + 1}`);
    default:
      throw new Error("Invalid direction");
  }
}