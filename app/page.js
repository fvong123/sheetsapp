"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  evaluateArithmetic,
  extractCellReferences,
  idToCellReference,
  cellReferenceToId,
} from "../utils/arithmeticUtils";

const Spreadsheet = dynamic(() => import("../components/Spreadsheet"), {
  ssr: false,
});
const FormulaBar = dynamic(() => import("../components/FormulaBar"), {
  ssr: false,
});
const FormatBar = dynamic(() => import("../components/FormatBar"), {
  ssr: false,
});

export default function SpreadsheetApp() {
  const [selectedCell, setSelectedCell] = useState("0-0");
  const [cellData, setCellData] = useState({});
  const [formulaValue, setFormulaValue] = useState("");
  const [isFormulaMode, setIsFormulaMode] = useState(false);
  const [dependencies, setDependencies] = useState({});
  const [formulaReferences, setFormulaReferences] = useState([]);

  const recalculateDependentCells = useCallback(
    (changedCellId, newData) => {
      const dependentCells = dependencies[changedCellId] || [];
      dependentCells.forEach((cellId) => {
        const cellFormula = newData[cellId]?.value;
        if (cellFormula && cellFormula.startsWith("=")) {
          try {
            const result = evaluateArithmetic(cellFormula.slice(1), newData);
            newData[cellId] = {
              ...newData[cellId],
              displayValue: result.toString(),
            };
            recalculateDependentCells(cellId, newData);
          } catch (error) {
            newData[cellId] = { ...newData[cellId], displayValue: "#ERROR" };
          }
        }
      });
      return newData;
    },
    [dependencies],
  );

  const updateCellData = useCallback(
    (cellId, newValue, isFormula = false) => {
      setCellData((prev) => {
        let newData = { ...prev };
        if (isFormula) {
          try {
            const result = evaluateArithmetic(newValue.slice(1), newData);
            newData[cellId] = {
              value: newValue,
              displayValue: result.toString(),
            };
          } catch (error) {
            newData[cellId] = { value: newValue, displayValue: "#ERROR" };
          }
          const cellRefs = extractCellReferences(newValue);
          setDependencies((prevDeps) => {
            const newDeps = { ...prevDeps };
            cellRefs.forEach((ref) => {
              const refId = cellReferenceToId(ref);
              if (!newDeps[refId]) newDeps[refId] = [];
              if (!newDeps[refId].includes(cellId)) newDeps[refId].push(cellId);
            });
            return newDeps;
          });
        } else {
          // If it's not a formula, check if it's a number
          const numericValue = parseFloat(newValue);
          if (!isNaN(numericValue) && newValue.trim() !== "") {
            newData[cellId] = {
              value: numericValue,
              displayValue: numericValue.toString(),
            };
          } else {
            // It's a string
            newData[cellId] = {
              value: newValue,
              displayValue: newValue,
            };
          }
        }
        return recalculateDependentCells(cellId, newData);
      });
    },
    [recalculateDependentCells],
  );

  const handleCellSelect = useCallback(
    (cellId) => {
      if (isFormulaMode) {
        const cellRef = idToCellReference(cellId);
        setFormulaValue((prev) => prev + cellRef);
      } else {
        setSelectedCell(cellId);
        setFormulaValue(cellData[cellId]?.value || "");
      }
    },
    [isFormulaMode, cellData],
  );

  const handleFormulaChange = useCallback(
    (value) => {
      setFormulaValue(value);
      if (value.startsWith("=") && !isFormulaMode) {
        setIsFormulaMode(true);
      } else if (!value.startsWith("=") && isFormulaMode) {
        setIsFormulaMode(false);
      }

      // Extract and set cell references
      const refs = extractCellReferences(value);
      setFormulaReferences(refs.map(cellReferenceToId));
    },
    [isFormulaMode],
  );

  const handleFormulaSubmit = useCallback(() => {
    const isFormula = formulaValue.startsWith("=");
    updateCellData(selectedCell, formulaValue, isFormula);
    setIsFormulaMode(false);
    setFormulaValue("");
  }, [selectedCell, formulaValue, updateCellData]);

  const handleFormulaCancel = useCallback(() => {
    setFormulaValue(cellData[selectedCell]?.value || "");
    setIsFormulaMode(false);
  }, [selectedCell, cellData]);

  const handleFormatChange = useCallback(
    (format) => {
      if (selectedCell) {
        setCellData((prev) => ({
          ...prev,
          [selectedCell]: { ...prev[selectedCell], ...format },
        }));
      }
    },
    [selectedCell],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "=" && !isFormulaMode) {
        e.preventDefault();
        setIsFormulaMode(true);
        setFormulaValue("=");
      } else if (e.key === "Escape" && isFormulaMode) {
        e.preventDefault();
        handleFormulaCancel();
      } else if (e.key === "Enter" && isFormulaMode) {
        e.preventDefault();
        handleFormulaSubmit();
      } else if (isFormulaMode) {
        if (e.key === "Backspace") {
          e.preventDefault();
          setFormulaValue((prev) => prev.slice(0, -1));
        } else if (e.key === "Delete") {
          // For Delete key, we don't need to do anything special
          // as it will be handled by the input element
        } else if (e.key.length === 1) {
          // This checks if the key is a printable character
          e.preventDefault();
          setFormulaValue((prev) => prev + e.key);
        }
      }
    },
    [isFormulaMode, handleFormulaCancel, handleFormulaSubmit],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const memoizedSpreadsheet = useMemo(
    () => (
      <Spreadsheet
        rows={20}
        cols={30}
        cellData={cellData}
        onCellSelect={handleCellSelect}
        selectedCell={selectedCell}
        isFormulaMode={isFormulaMode}
        updateCellData={updateCellData}
        formulaReferences={formulaReferences}
      />
    ),
    [cellData, handleCellSelect, selectedCell, isFormulaMode, updateCellData],
  );

  return (
    <div className="min-h-screen bg-base-200">
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Next.js Spreadsheet</h1>
        <FormulaBar
          value={formulaValue}
          onChange={handleFormulaChange}
          onSubmit={handleFormulaSubmit}
          onCancel={handleFormulaCancel}
          isFormulaMode={isFormulaMode}
        />
        <FormatBar onFormatChange={handleFormatChange} />
        <div className="mt-4">{memoizedSpreadsheet}</div>
      </main>
    </div>
  );
}
