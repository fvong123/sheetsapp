"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import {
  evaluateArithmetic,
  extractCellReferences,
  idToCellReference,
  cellReferenceToId,
  extractPartialCellReferences,
  processInput,
  formatResult,
} from "../utils/arithmeticUtils";
import ChecksModal from './ChecksModal';
import UserChecksModal from './UserChecksModal';
import ProgressIndicator from './ProgressIndicator';
import Link from "next/link";

const Spreadsheet = dynamic(() => import("./Spreadsheet"), {
  ssr: false,
});
const FormulaBar = dynamic(() => import("./FormulaBar"), {
  ssr: false,
});
const FormatBar = dynamic(() => import("./FormatBar"), {
  ssr: false,
});

export default function SpreadsheetApp({ creator, initialData, nextPageLink }) {
  // spreadsheet states
  const [selectedCell, setSelectedCell] = useState("0-0");
  const [cellData, setCellData] = useState({});
  const [checkData, setCheckData] = useState({});
  const [formulaValue, setFormulaValue] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [dependencies, setDependencies] = useState({});
  const [formulaReferences, setFormulaReferences] = useState([]);
  const [focusFormulaBar, setFocusFormulaBar] = useState(false);
  const [currentFormulaCell, setCurrentFormulaCell] = useState(null);
  const [saveMode, setSaveMode] = useState("new");
  const [selectedSaveId, setSelectedSaveId] = useState(null);
  const [cellFormatting, setCellFormatting] = useState({});
  const [currentFormat, setCurrentFormat] = useState({});
  const [isChecksModalOpen, setIsChecksModalOpen] = useState(false);
  const [cellErrors, setCellErrors] = useState({});
  const [isUserChecksModalOpen, setIsUserChecksModalOpen] = useState(false);
  const [checkResults, setCheckResults] = useState([]);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const [selectedCells, setSelectedCells] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState(null);
  const [name, setName] = useState("");  // New state for spreadsheet name

  // states for save and load modals
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [savedSpreadsheets, setSavedSpreadsheets] = useState([]);
  const [error, setError] = useState(null);
  
  // Other variables
  const [isEditing, setIsEditing] = useState(false); // New state for spreadsheet name editing

  // save and load functions

  const handleSave = useCallback(async () => {
    try {
      console.log("save");
      const response = await fetch("/api/save-spreadsheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedSaveId,
          name: name,  // Use the name state here
          data: cellData,
          formatting: cellFormatting,
          check_data: checkData
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save spreadsheet");
      }

      const result = await response.json();
      console.log(result);

      setIsSaveModalOpen(false);
      setSavedSpreadsheets((prev) => [
        ...prev.filter((s) => s.id !== selectedSaveId),
        { id: result.id, name: name },  // Use the name state here
      ]);
      setSelectedSaveId(result.id);
    } catch (error) {
      console.error("Save error:", error);
      setError("Failed to save spreadsheet. Please try again.");
    }
  }, [selectedSaveId, name, cellData, cellFormatting, checkData]);  // Add name to dependencies

  const handleLoad = async (id) => {
    try {
      const response = await fetch("/api/load-spreadsheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      console.log(response)

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      const { data, formatting, check_data, name } = await response.json();
      setCellData(data);
      setCheckData(check_data || {})
      setCellFormatting(formatting || {});
      setName(name);  // Set the name state
      setIsLoadModalOpen(false);

      // Log loaded data for debugging
      console.log("Loaded cell data:", data);
      console.log("Loaded formatting:", formatting);
      console.log("Loaded check data:", check_data);
      console.log("Loaded name:", name);
    } catch (error) {
      console.error("Load error:", error);
      setError(
        error.message || "Failed to load spreadsheet. Please try again.",
      );
    }
  };

  const fetchSavedSpreadsheets = async () => {
    try {
      const response = await fetch("/api/load-spreadsheet");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      const data = await response.json();
      setSavedSpreadsheets(data);
    } catch (error) {
      console.error("Fetch saved spreadsheets error:", error);
      setError(
        error.message ||
          "Failed to fetch saved spreadsheets. Please try again.",
      );
    }
  };

  // spreadsheet functions

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
              displayValue: formatResult(result),
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
      console.log(`Updating cell ${cellId} with value:`, newValue); // Debug log
      setCellData((prev) => {
        let newData = { ...prev };
        let newErrors = { ...cellErrors };
        if (newValue.startsWith("=")) {
          console.log("Handling formula"); // Debug log
          try {
            const formulaWithoutEquals = newValue.slice(1);
            const result = evaluateArithmetic(formulaWithoutEquals, newData);
            console.log("Formula result:", result); // Debug log
            newData[cellId] = {
              value: result, // Store the numeric result
              displayValue: formatResult(result),
            };
            delete newErrors[cellId];
          } catch (error) {
            console.error("Formula evaluation error:", error);
            newData[cellId] = { value: newValue, displayValue: "#ERROR" };
            newErrors[cellId] = error.message;
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
          console.log("Handling empty cell"); // Debug log
          delete newData[cellId];
          delete newErrors[cellId];
        } else {
          console.log("Handling non-formula input"); // Debug log
          const processedValue = processInput(newValue);
          newData[cellId] = {
            value: processedValue.value,
            displayValue: processedValue.displayValue,
          };
          delete newErrors[cellId];
        }
        setCellErrors(newErrors);
        return recalculateDependentCells(cellId, newData);
      });
      // Preserve formatting when updating cell data
      setCellFormatting((prev) => ({
        ...prev,
        [cellId]: { ...(prev[cellId] || {}), ...currentFormat },
      }));
    },
    [recalculateDependentCells, currentFormat, cellErrors],
  );

  const updateFormulaReferences = useCallback((value) => {
    // Extract complete cell references from the formula
    const completeRefs = extractCellReferences(value);
    
    // Extract partial cell references (e.g., incomplete references being typed)
    const partialRef = extractPartialCellReferences(value);
    
    // Combine complete and partial references
    const allRefs = [...completeRefs, ...partialRef];
    
    // Filter out invalid references
    const validRefs = allRefs.filter((ref) => {
      try {
        // Attempt to convert the reference to a cell ID
        cellReferenceToId(ref);
        return true; // If successful, keep the reference
      } catch {
        return false; // If conversion fails, discard the reference
      }
    });
    
    // Update the formula references state with valid cell IDs
    setFormulaReferences(validRefs.map(cellReferenceToId));
  }, []);

  const enterEditMode = useCallback(
    (initialValue = "") => {
      setIsEditMode(true);
      setFormulaValue(initialValue);
      updateFormulaReferences(initialValue);
      setCurrentFormulaCell(null);
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
    (cellId, isShiftKey = false) => {
      console.log("Cell selected:", cellId);

      if (isEditMode && formulaValue.startsWith("=")) {
        const cellRef = idToCellReference(cellId);
        console.log("Adding cell reference:", cellRef);

        setFormulaValue((prevValue) => {
          let newValue;
          if (currentFormulaCell) {
            const lastRef = idToCellReference(currentFormulaCell);
            newValue = prevValue.replace(new RegExp(lastRef + "$"), cellRef);
          } else {
            newValue =
              prevValue === "=" || /[+\-*/]$/.test(prevValue)
                ? prevValue + cellRef
                : prevValue + "+" + cellRef;
          }
          console.log("New formula value:", newValue);
          // updateFormulaReferences(newValue);
          return newValue;
        });

        setCurrentFormulaCell(cellId);
        setFocusFormulaBar(true);
      } else {
        let newSelectedCells;
        if (isShiftKey && selectedCells.length > 0) {
          const [startRow, startCol] = selectedCells[0].split("-").map(Number);
          const [endRow, endCol] = cellId.split("-").map(Number);
          newSelectedCells = [];
          for (let r = Math.min(startRow, endRow); r <= Math.max(startRow, endRow); r++) {
            for (let c = Math.min(startCol, endCol); c <= Math.max(startCol, endCol); c++) {
              newSelectedCells.push(`${r}-${c}`);
            }
          }
        } else {
          newSelectedCells = [cellId];
        }
        setSelectedCells(newSelectedCells);
        
        // Set selectedCell as the first cell in the selectedCells range
        const firstSelectedCell = newSelectedCells[0];
        setSelectedCell(firstSelectedCell);
        
        const newValue = cellData[firstSelectedCell]?.value || "";
        setFormulaValue(newValue);
        setFormulaReferences([]);
        console.log("Selected cell value:", newValue);
      }

      setCurrentFormat(cellFormatting[cellId] || {});
      console.log("Current format set:", cellFormatting[cellId] || {});
    },
    [
      isEditMode,
      formulaValue,
      currentFormulaCell,
      cellData,
      cellFormatting,
      updateFormulaReferences,
      idToCellReference,
      selectedCells,
    ],
  );

  const handleSelectionStart = useCallback((cellId) => {
    setIsSelecting(true);
    setSelectionStart(cellId);
    setSelectedCells([cellId]);
    setSelectedCell(cellId);  // Set selectedCell when starting a new selection
  }, []);

  const handleSelectionMove = useCallback((cellId) => {
    if (isSelecting && selectionStart) {
      const [startRow, startCol] = selectionStart.split("-").map(Number);
      const [endRow, endCol] = cellId.split("-").map(Number);
      const newSelection = [];
      for (let r = Math.min(startRow, endRow); r <= Math.max(startRow, endRow); r++) {
        for (let c = Math.min(startCol, endCol); c <= Math.max(startCol, endCol); c++) {
          newSelection.push(`${r}-${c}`);
        }
      }
      setSelectedCells(newSelection);
      // Keep the selectedCell as the first cell in the range
      setSelectedCell(newSelection[0]);
      console.log("Selected cell:", newSelection[0]);
    }
  }, [isSelecting, selectionStart]);

  const handleSelectionEnd = useCallback(() => {
    setIsSelecting(false);
  }, []);

  const handleEditSubmit = useCallback(() => {
    updateCellData(selectedCell, formulaValue);
    setIsEditMode(false);
    setFormulaValue("");
    setFormulaReferences([]);
    setCurrentFormulaCell(null);
    setTimeout(() => {
      document.getElementById("spreadsheet-container").focus();
    }, 0);
  }, [selectedCell, formulaValue, updateCellData]);

  const handleFormulaCancel = useCallback(() => {
    setFormulaValue(cellData[selectedCell]?.value || "");
    setIsEditMode(false);
    setFormulaReferences([]);
    setCurrentFormulaCell(null);
    setTimeout(() => {
      document.getElementById("spreadsheet-container").focus();
    }, 0);
  }, [selectedCell, cellData]);

  const handleFormatChange = useCallback(
    (format) => {
      setCurrentFormat((prev) => ({ ...prev, ...format }));
      setCellFormatting((prev) => {
        const newFormatting = { ...prev };
        selectedCells.forEach((cellId) => {
          newFormatting[cellId] = { ...(newFormatting[cellId] || {}), ...format };
        });
        return newFormatting;
      });
    },
    [selectedCells],
  );

  const handleCreateChecks = useCallback(() => {
    setIsChecksModalOpen(true);
  }, []);

  const handleSaveChecks = useCallback((newChecks) => {
    const newCheckData = {};
    newChecks.forEach(check => {
      // The cellReference is already in numeric format (e.g., "0-0")
      // We don't need to convert it again
      newCheckData[check.cellReference] = {
        name: check.name,
        hint: check.hint,
        checkValue: check.checkValue
      };
    });
    console.log('Saving check data:', newCheckData); // Debug log
    setCheckData(newCheckData);
  }, []);

  const handleCheckAnswers = useCallback(() => {
    const results = Object.entries(checkData).map(([cellRef, check]) => {
      const cellValue = cellData[cellRef]?.displayValue;
      const isCorrect = cellValue === check.checkValue;
      return {
        name: check.name,
        correct: isCorrect,
        hint: check.hint
      };
    });
    setCheckResults(results);
    setIsUserChecksModalOpen(true);

    // Check if all answers are correct
    const allCorrect = results.every(result => result.correct);
    setIsNextButtonEnabled(allCorrect);
  }, [checkData, cellData]);

  const handleKeyDown = useCallback(
    (e) => {
      e.stopPropagation();
      console.log('keydown', e.key)

      if (!isEditMode) {
        const [row, col] = selectedCell.split("-").map(Number);
        let newRow = row;
        let newCol = col;

        switch (e.key) {
          case "ArrowUp":
          case "ArrowDown":
          case "ArrowLeft":
          case "ArrowRight":
            e.preventDefault();
            newRow = Math.max(
              0,
              Math.min(
                29,
                row +
                  (e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0),
              ),
            );
            newCol = Math.max(
              0,
              Math.min(
                12,
                col +
                  (e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0),
              ),
            );
            const newCellId = `${newRow}-${newCol}`;
            handleCellSelect(newCellId, e.shiftKey);
            break;
          case "Enter":
            e.preventDefault();
            enterEditMode(cellData[selectedCell]?.value || "");
            setFocusFormulaBar(true);
            return;
          case "Delete":
            e.preventDefault();
            updateCellData(selectedCell, "", false);
            setFormulaValue("");
            setFormulaReferences([]);
            return;
          default:
            if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
              e.preventDefault();
              enterEditMode(e.key);
              setFocusFormulaBar(true);
            }
            return;
        }
      } else {
        // Edit mode behavior
        switch (e.key) {
          case "Enter":
            e.preventDefault();
            handleEditSubmit();
            break;
          case "Escape":
            e.preventDefault();
            handleFormulaCancel();
            break;
          case "ArrowUp":
          case "ArrowDown":
          case "ArrowLeft":
          case "ArrowRight":
            if (formulaValue.startsWith("=")) {
              e.preventDefault();
              let [row, col] = (currentFormulaCell || selectedCell)
                .split("-")
                .map(Number);
              row = Math.max(
                0,
                Math.min(
                  29,
                  row +
                    (e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0),
                ),
              );
              col = Math.max(
                0,
                Math.min(
                  12,
                  col +
                    (e.key === "ArrowRight"
                      ? 1
                      : e.key === "ArrowLeft"
                        ? -1
                        : 0),
                ),
              );
              const newCellId = `${row}-${col}`;
              const cellRef = idToCellReference(newCellId);

              if (!currentFormulaCell) {
                setFormulaValue((prev) => prev + cellRef);
              } else {
                setFormulaValue((prev) => {
                  const lastRef = idToCellReference(currentFormulaCell);
                  return prev.replace(new RegExp(lastRef + "$"), cellRef);
                });
              }

              setCurrentFormulaCell(newCellId);
              // updateFormulaReferences(formulaValue);
            }
            break;
          default:
            if (currentFormulaCell) {
              setCurrentFormulaCell(null);
            }
            break;
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
      formulaValue,
      updateFormulaReferences,
      handleCellSelect,
    ],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (isSaveModalOpen || isLoadModalOpen) {
      fetchSavedSpreadsheets();
    }
  }, [isSaveModalOpen, isLoadModalOpen]);

  useEffect(() => {
    if (initialData !== null) {
      handleLoad(initialData);
    }
  }, []); // Empty dependency array means this effect runs once on mount

  // Reset isNextButtonEnabled when the component mounts or when checkData changes
  useEffect(() => {
    setIsNextButtonEnabled(false);
    setCheckResults([]);
  }, [checkData]);

  const memoizedSpreadsheet = useMemo(
    () => (
      <Spreadsheet
        rows={30}
        cols={13}
        cellData={cellData}
        cellFormatting={cellFormatting}
        onCellSelect={handleCellSelect}
        selectedCells={selectedCells}
        isEditMode={isEditMode}
        updateCellData={updateCellData}
        formulaReferences={formulaReferences}
        currentFormulaCell={currentFormulaCell}
        checkData={checkData}
        cellErrors={cellErrors}
        onSelectionStart={handleSelectionStart}
        onSelectionMove={handleSelectionMove}
        onSelectionEnd={handleSelectionEnd}
      />
    ),
    [
      cellData,
      cellFormatting,
      handleCellSelect,
      selectedCells,
      isEditMode,
      updateCellData,
      formulaReferences,
      currentFormulaCell,
      checkData,
      cellErrors,
      handleSelectionStart,
      handleSelectionMove,
      handleSelectionEnd,
    ],
  );

  return (
    <div
      id="spreadsheet-container"
      className="h-full overflow-auto bg-base-200 border"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {error && (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}
      <main className="flex flex-col flex-grow overflow-hidden h-full p-3">
        <div className="flex justify-between items-center mb-4">
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-lg font-semibold bg-white border border-gray-300 focus:outline-none focus:border-blue-500 w-1/2 px-2 py-1"
              placeholder="Enter spreadsheet name"
              onBlur={() => setIsEditing(false)}
              autoFocus
            />
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-lg font-semibold bg-transparent border-none focus:outline-none w-1/2 text-left"
            >
              {name || "Enter spreadsheet name"}
            </button>
          )}
          {creator && (
            <div>
              <button
                className="btn btn-primary btn-sm px-2 py-1 text-xs mr-2"
                onClick={() => setIsSaveModalOpen(true)}
              >
                Save
              </button>
              <button
                className="btn btn-secondary btn-sm px-2 py-1 text-xs"
                onClick={() => setIsLoadModalOpen(true)}
              >
                Load
              </button>
            </div>
          )}
        </div>
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
        <FormatBar
          onFormatChange={handleFormatChange}
          currentFormat={currentFormat}
          onCreateChecks={handleCreateChecks}
          creator={creator}
        />
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleCheckAnswers}
            >
              Check Answers
            </button>
            {nextPageLink && (
              <Link href={nextPageLink}>
                <button
                  className="btn btn-primary btn-sm"
                  disabled={!isNextButtonEnabled}
                >
                  Go to Next
                </button>
              </Link>
            )}
          </div>
          <ProgressIndicator checkResults={checkResults} />
        </div>
        
        <div className="h-full mt-4">
          <Spreadsheet
            rows={30}
            cols={13}
            cellData={cellData}
            cellFormatting={cellFormatting}
            onCellSelect={handleCellSelect}
            selectedCells={selectedCells}
            isEditMode={isEditMode}
            updateCellData={updateCellData}
            formulaReferences={formulaReferences}
            currentFormulaCell={currentFormulaCell}
            checkData={checkData}
            cellErrors={cellErrors}
            onSelectionStart={handleSelectionStart}
            onSelectionMove={handleSelectionMove}
            onSelectionEnd={handleSelectionEnd}
          />
        </div>
      </main>

      {/* Save Modal */}
      {isSaveModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Save Spreadsheet</h3>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Create new save</span>
                <input
                  type="radio"
                  name="save-mode"
                  className="radio"
                  checked={saveMode === "new"}
                  onChange={() => setSaveMode("new")}
                />
              </label>
            </div>
            {saveMode === "new" && (
              <input
                type="text"
                placeholder="Enter save name"
                className="input input-bordered w-full mt-2"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
              />
            )}
            <div className="form-control mt-2">
              <label className="label cursor-pointer">
                <span className="label-text">Overwrite existing save</span>
                <input
                  type="radio"
                  name="save-mode"
                  className="radio"
                  checked={saveMode === "overwrite"}
                  onChange={() => setSaveMode("overwrite")}
                />
              </label>
            </div>
            {saveMode === "overwrite" && (
              <ul className="menu bg-base-100 w-full mt-2">
                {savedSpreadsheets.map((sheet) => (
                  <li key={sheet.id}>
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        {sheet.name} -{" "}
                        {new Date(sheet.created_at).toLocaleString()}
                      </span>
                      <input
                        type="radio"
                        name="save-select"
                        className="radio"
                        checked={selectedSaveId === sheet.id}
                        onChange={() => setSelectedSaveId(sheet.id)}
                      />
                    </label>
                  </li>
                ))}
              </ul>
            )}
            <div className="modal-action">
              <button className="btn" onClick={() => setIsSaveModalOpen(false)}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={saveMode === "overwrite" && !selectedSaveId}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Load Modal */}
      {isLoadModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Load Spreadsheet</h3>
            <ul className="menu bg-base-100 w-full mt-2">
              {savedSpreadsheets.map((sheet) => (
                <li key={sheet.id}>
                  <a onClick={() => handleLoad(sheet.id)}>
                    {sheet.name} - {new Date(sheet.created_at).toLocaleString()}
                  </a>
                </li>
              ))}
            </ul>
            <div className="modal-action">
              <button className="btn" onClick={() => setIsLoadModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ChecksModal
        isOpen={isChecksModalOpen}
        onClose={() => setIsChecksModalOpen(false)}
        onSave={handleSaveChecks}
        cellData={cellData}
      />

      <UserChecksModal
        isOpen={isUserChecksModalOpen}
        onClose={() => setIsUserChecksModalOpen(false)}
        checkResults={checkResults}
      />
    </div>
  );
}
