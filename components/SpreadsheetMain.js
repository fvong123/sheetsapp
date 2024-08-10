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
// const FormatBar = dynamic(() => import("./FormatBar"), {
//   ssr: false,
// });

export default function SpreadsheetApp({ creator, initialData }) {
  // spreadsheet states
  const [selectedCell, setSelectedCell] = useState("0-0");
  const [cellData, setCellData] = useState({});
  const [formulaValue, setFormulaValue] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [dependencies, setDependencies] = useState({});
  const [formulaReferences, setFormulaReferences] = useState([]);
  const [focusFormulaBar, setFocusFormulaBar] = useState(false);
  const [currentFormulaCell, setCurrentFormulaCell] = useState(null);

  // states for save and load modals
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [savedSpreadsheets, setSavedSpreadsheets] = useState([]);
  const [error, setError] = useState(null);

  // Other variables

  // save and load functions

  const handleSave = async () => {
    try {
      setError(null);
      const response = await fetch("/api/save-spreadsheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: saveName, data: cellData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      const result = await response.json();
      console.log(result.message);
      setIsSaveModalOpen(false);
      setSaveName("");
      // Optionally, show a success message
    } catch (error) {
      console.error("Save error:", error);
      setError(
        error.message || "Failed to save spreadsheet. Please try again.",
      );
    }
  };

  const handleLoad = async (id) => {
    try {
      const response = await fetch("/api/load-spreadsheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      const { data } = await response.json();
      setCellData(data);
      setIsLoadModalOpen(false);
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
    (cellId) => {
      if (isEditMode && formulaValue.startsWith("=")) {
        const cellRef = idToCellReference(cellId);
        if (currentFormulaCell) {
          setFormulaValue((prevValue) => {
            const lastRef = idToCellReference(currentFormulaCell);
            return prevValue.replace(new RegExp(lastRef + "$"), cellRef);
          });
        } else {
          setFormulaValue((prevValue) => {
            if (prevValue === "=" || /[+\-*/]$/.test(prevValue)) {
              return prevValue + cellRef;
            }
            return prevValue + "+" + cellRef;
          });
        }
        setCurrentFormulaCell(cellId);
        updateFormulaReferences(formulaValue);
        setFocusFormulaBar(true);
      } else {
        setSelectedCell(cellId);
        setFormulaValue(cellData[cellId]?.value || "");
        setFormulaReferences([]);
      }
    },
    [
      isEditMode,
      cellData,
      updateFormulaReferences,
      formulaValue,
      currentFormulaCell,
    ],
  );

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
                14,
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
            setSelectedCell(`${newRow}-${newCol}`);
            setFormulaValue(cellData[`${newRow}-${newCol}`]?.value || "");
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
                  14,
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
              updateFormulaReferences(formulaValue);
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
    ],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (isLoadModalOpen) {
      fetchSavedSpreadsheets();
    }
  }, [isLoadModalOpen]);

  useEffect(() => {
    if (initialData !== null) {
      handleLoad(initialData);
    }
  }, []); // Empty dependency array means this effect runs once on mount

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
          <h3 className="text-lg font-semibold">Formula Bar</h3>
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
        <div className="h-full mt-4">
          <Spreadsheet
            rows={30}
            cols={13}
            cellData={cellData}
            onCellSelect={handleCellSelect}
            selectedCell={selectedCell}
            isEditMode={isEditMode}
            updateCellData={updateCellData}
            formulaReferences={formulaReferences}
            currentFormulaCell={currentFormulaCell}
          />
        </div>
      </main>

      {/* Save Modal */}
      {isSaveModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Save Spreadsheet</h3>
            <input
              type="text"
              placeholder="Enter save name"
              className="input input-bordered w-full mt-2"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
            />
            <div className="modal-action">
              <button className="btn" onClick={() => setIsSaveModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
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
    </div>
  );
}
