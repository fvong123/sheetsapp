import { useState, useEffect } from 'react';
import { cellReferenceToId, idToCellReference, isValidCellReference } from '../utils/arithmeticUtils';

export default function ChecksModal({ isOpen, onClose, onSave, existingChecks }) {
  const [checks, setChecks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && existingChecks) {
      // Convert existing checks to the format used in the modal
      const formattedChecks = Object.entries(existingChecks).map(([cellId, check]) => ({
        name: check.name,
        cellReference: idToCellReference(cellId),
        checkValue: check.checkValue,
        hint: check.hint
      }));
      setChecks(formattedChecks.length > 0 ? formattedChecks : [{ name: '', cellReference: '', checkValue: '', hint: '' }]);
    }
  }, [isOpen, existingChecks]);

  const handleInputChange = (index, field, value) => {
    const newChecks = [...checks];
    if (field === 'cellReference') {
      value = value.toUpperCase();
    }
    newChecks[index][field] = value;
    setChecks(newChecks);
  };

  const addNewRow = () => {
    setChecks([...checks, { name: '', cellReference: '', checkValue: '', hint: '' }]);
  };

  const deleteRow = (index) => {
    const newChecks = checks.filter((_, i) => i !== index);
    setChecks(newChecks);
  };

  const handleSave = () => {
    setError('');
    const validatedChecks = checks.map(check => {
      const { cellReference, ...rest } = check;
      if (cellReference) {
        if (!isValidCellReference(cellReference)) {
          setError('Invalid cell reference format. Please use format like A1, B2, etc.');
          return null;
        }
        const convertedReference = cellReferenceToId(cellReference);
        console.log(`Converting ${cellReference} to ${convertedReference}`);
        return { ...rest, cellReference: convertedReference };
      }
      return check;
    });

    if (validatedChecks.some(check => check === null)) {
      return; // Don't save if there are invalid cell references
    }

    console.log('Saving checks:', validatedChecks);
    onSave(validatedChecks);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-xl w-3/4 max-w-2xl relative">
        <h2 className="text-xl font-bold mb-4">Create Checks</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <table className="w-full mb-4 bg-white">
          <thead>
            <tr>
              <th className="text-left bg-white">Name</th>
              <th className="text-left bg-white">Cell Reference</th>
              <th className="text-left bg-white">Value</th>
              <th className="text-left bg-white">Hint</th>
              <th className="text-left bg-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {checks.map((check, index) => (
              <tr key={index}>
                <td className="bg-white">
                  <input
                    type="text"
                    value={check.name}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="bg-white">
                  <input
                    type="text"
                    value={check.cellReference}
                    onChange={(e) => handleInputChange(index, 'cellReference', e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="bg-white">
                  <input
                    type="text"
                    value={check.checkValue}
                    onChange={(e) => handleInputChange(index, 'checkValue', e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="bg-white">
                  <input
                    type="text"
                    value={check.hint}
                    onChange={(e) => handleInputChange(index, 'hint', e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="bg-white">
                  <button
                    onClick={() => deleteRow(index)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addNewRow} className="btn btn-sm btn-outline mb-4">Add Row</button>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="btn btn-sm">Cancel</button>
          <button onClick={handleSave} className="btn btn-sm btn-primary">Ok</button>
        </div>
      </div>
    </div>
  );
}