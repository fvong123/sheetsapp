import { idToCellReference, cellReferenceToId } from './arithmeticUtils';

export const handleNonEditModeKeyDown = (
  e,
  {
    selectedCell,
    selectedCells,
    cellData,
    handleCellSelect,
    enterEditMode,
    updateCellData,
    setFormulaValue,
    setFormulaReferences,
    setFocusFormulaBar,
    setCurrentInput,  // Add this parameter
  }
) => {
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
          row + (e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0),
        ),
      );
      newCol = Math.max(
        0,
        Math.min(
          12,
          col + (e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0),
        ),
      );
      const newCellId = `${newRow}-${newCol}`;
      handleCellSelect(newCellId, e.shiftKey);
      break;
    case "Enter":
      e.preventDefault();
      enterEditMode(cellData[selectedCell]?.value || "");
      setFocusFormulaBar(true);
      break;
    case "Delete":
      e.preventDefault();
      selectedCells.forEach(cellId => {
        updateCellData(cellId, "", false);
      });
      setFormulaValue("");
      setCurrentInput("");  // Clear the current input immediately
      setFormulaReferences([]);
      break;
    default:
      if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        e.preventDefault();
        enterEditMode(e.key);
        setFocusFormulaBar(true);
      }
  }
};

export const handleEditModeKeyDown = (
  e,
  {
    formulaValue,
    currentFormulaCell,
    selectedCell,
    handleEditSubmit,
    handleFormulaCancel,
    setFormulaValue,
    setCurrentFormulaCell,
  }
) => {
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
      if (typeof formulaValue === 'string' && formulaValue.startsWith("=")) {
        e.preventDefault();
        let [row, col] = (currentFormulaCell || selectedCell)
          .split("-")
          .map(Number);
        row = Math.max(
          0,
          Math.min(
            29,
            row + (e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0),
          ),
        );
        col = Math.max(
          0,
          Math.min(
            12,
            col + (e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0),
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
      }
      break;
    default:
      if (currentFormulaCell) {
        setCurrentFormulaCell(null);
      }
      break;
  }
};