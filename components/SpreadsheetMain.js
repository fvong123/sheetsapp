"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import {
  evaluateArithmetic,
  extractCellReferences,
  idToCellReference,
  cellReferenceToId,
  extractPartialCellReferences,
} from "../utils/arithmeticUtils";

const Spreadsheet = dynamic(() => import("./Spreadsheet"), {
  ssr: false,
});
const FormulaBar = dynamic(() => import("./FormulaBar"), {
  ssr: false,
});
const FormatBar = dynamic(() => import("./FormatBar"), {
  ssr: false,
});

export default function SpreadsheetApp() {
  const [selectedCell, setSelectedCell] = useState("0-0");
  const [cellData, setCellData] = useState({});
  const [formulaValue, setFormulaValue] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [dependencies, setDependencies] = useState({});
  const [formulaReferences, setFormulaReferences] = useState([]);
  const [focusFormulaBar, setFocusFormulaBar] = useState(false);

  const formulaBarRef = useRef(null);

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
    (cellId, newValue) => {
      setCellData((prev) => {
        let newData = { ...prev };
        if (newValue.startsWith("=")) {
          // Handle formula
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
        } else if (newValue === "") {
          delete newData[cellId];
        } else {
          const numericValue = parseFloat(newValue);
          if (!isNaN(numericValue) && newValue.trim() !== "") {
            newData[cellId] = {
              value: numericValue,
              displayValue: numericValue.toString(),
            };
          } else {
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

  const updateFormulaReferences = useCallback((value) => {
    const completeRefs = extractCellReferences(value);
    const partialRef = extractPartialCellReferences(value);
    const allRefs = [...completeRefs, ...partialRef];
    const validRefs = allRefs.filter((ref) => {
      try {
        cellReferenceToId(ref);
        return true;
      } catch {
        return false;
      }
    });
    setFormulaReferences(validRefs.map(cellReferenceToId));
  }, []);

  const enterEditMode = useCallback(
    (initialValue = "") => {
      setIsEditMode(true);
      setFormulaValue(initialValue);
      updateFormulaReferences(initialValue);
    },
    [updateFormulaReferences],
  );

  const handleFormulaChange = useCallback(
    (value) => {
      setFormulaValue(value);
      updateFormulaReferences(value);
    },
    [updateFormulaReferences],
  );

  const handleCellSelect = useCallback(
    (cellId) => {
      if (isEditMode) {
        const cellRef = idToCellReference(cellId);
        setFormulaValue((prevValue) => {
          if (prevValue === "=" || /[+\-*/]$/.test(prevValue)) {
            return prevValue + cellRef;
          }
          return prevValue + "+" + cellRef;
        });
        updateFormulaReferences(formulaValue + cellRef);
        setFocusFormulaBar(true); // Trigger focus on formula bar
      } else {
        setSelectedCell(cellId);
        setFormulaValue(cellData[cellId]?.value || "");
        setFormulaReferences([]);
      }
    },
    [isEditMode, cellData, updateFormulaReferences, formulaValue],
  );

  const handleEditSubmit = useCallback(() => {
    updateCellData(selectedCell, formulaValue);
    setIsEditMode(false);
    setFormulaValue("");
    setFormulaReferences([]);
    setTimeout(() => {
      document.getElementById("spreadsheet-container").focus();
    }, 0);
  }, [selectedCell, formulaValue, updateCellData]);

  const handleFormulaCancel = useCallback(() => {
    setFormulaValue(cellData[selectedCell]?.value || "");
    setIsEditMode(false);
    setFormulaReferences([]); // Clear formula references after canceling
    setTimeout(() => {
      document.getElementById("spreadsheet-container").focus();
    }, 0);
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
      e.stopPropagation();
      if (isEditMode) {
        if (e.key === "Enter") {
          e.preventDefault();
          handleEditSubmit();
        } else if (e.key === "Escape") {
          e.preventDefault();
          handleFormulaCancel();
        } else if (e.key === "Backspace") {
          e.preventDefault();
          setFormulaValue((prev) => prev.slice(0, -1));
        } else if (["+", "-", "*", "/", "a"].includes(e.key)) {
          e.preventDefault();
          setFormulaValue((prev) => prev + e.key);
        } else if (e.key.length === 1) {
          // This condition allows all printable characters
          setFormulaValue((prev) => prev + e.key);
        }
        // else if (e.key === "Enter") {
        //   e.preventDefault();
        //   handleFormulaSubmit();
        //   console.log("pagejs enter");
        // }
        return;
      } else {
        const [row, col] = selectedCell.split("-").map(Number);
        let newRow = row;
        let newCol = col;

        switch (e.key) {
          case "ArrowUp":
            e.preventDefault();
            newRow = Math.max(0, row - 1);
            break;
          case "ArrowDown":
            e.preventDefault();
            newRow = Math.min(15, row + 1); // Assuming 20 rows (0-19)
            console.log("down");
            break;
          case "ArrowLeft":
            e.preventDefault();
            newCol = Math.max(0, col - 1);
            break;
          case "ArrowRight":
            e.preventDefault();
            newCol = Math.min(13, col + 1); // Assuming 30 columns (0-29)
            console.log("right");
            break;
          case "=":
            e.preventDefault();
            enterEditMode("=");
            return;
          case "Enter":
            e.preventDefault();
            enterEditMode(cellData[selectedCell]?.value || "");
            setFocusFormulaBar(true);
            return;
          case "Delete":
            e.preventDefault();
            updateCellData(selectedCell, "", false);
            setFormulaValue("");
            setFormulaReferences([]); // Clear formula references when deleting cell content
            return;
          default:
            return;
        }

        if (newRow !== row || newCol !== col) {
          e.preventDefault();
          setSelectedCell(`${newRow}-${newCol}`);
          setFormulaValue(cellData[`${newRow}-${newCol}`]?.value || "");
        }
      }
    },
    [
      isEditMode,
      selectedCell,
      cellData,
      enterEditMode,
      handleEditSubmit,
      handleFormulaCancel,
    ],
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
        rows={15}
        cols={13}
        cellData={cellData}
        onCellSelect={handleCellSelect}
        selectedCell={selectedCell}
        isEditMode={isEditMode}
        updateCellData={updateCellData}
        formulaReferences={formulaReferences}
      />
    ),
    [cellData, handleCellSelect, selectedCell, isEditMode, updateCellData],
  );

  return (
    <div
      id="spreadsheet-container"
      className="min-h-screen bg-base-200 border"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Next.js Spreadsheet</h1>
        <FormulaBar
          ref={formulaBarRef}
          value={formulaValue}
          onChange={handleFormulaChange}
          onSubmit={handleEditSubmit}
          onCancel={handleFormulaCancel}
          isEditMode={isEditMode}
          focusFormulaBar={focusFormulaBar}
          setFocusFormulaBar={setFocusFormulaBar}
        />
        <FormatBar onFormatChange={handleFormatChange} />
        <div className="mt-4">
          <Spreadsheet
            rows={15}
            cols={13}
            cellData={cellData}
            onCellSelect={handleCellSelect}
            selectedCell={selectedCell}
            isEditMode={isEditMode}
            updateCellData={updateCellData}
            formulaReferences={formulaReferences}
          />
        </div>
      </main>
    </div>
  );
}
