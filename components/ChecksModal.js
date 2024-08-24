import { useState } from 'react';

export default function ChecksModal({ isOpen, onClose, onSave }) {
  const [checks, setChecks] = useState([{ name: '', cellReference: '', checkValue: '', hint: '' }]);

  const handleInputChange = (index, field, value) => {
    const newChecks = [...checks];
    newChecks[index][field] = value;
    setChecks(newChecks);
  };

  const addNewRow = () => {
    setChecks([...checks, { name: '', cellReference: '', checkValue: '', hint: '' }]);
  };

  const handleSave = () => {
    onSave(checks);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-xl w-3/4 max-w-2xl relative">
        <h2 className="text-xl font-bold mb-4">Create Checks</h2>
        <table className="w-full mb-4 bg-white">
          <thead>
            <tr>
              <th className="text-left bg-white">Name</th>
              <th className="text-left bg-white">Cell Reference</th>
              <th className="text-left bg-white">Value</th>
              <th className="text-left bg-white">Hint</th>
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