import React from 'react';

export default function UserChecksModal({ isOpen, onClose, checkResults }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-xl w-3/4 max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Check Results</h2>
        <div className="overflow-y-auto max-h-96">
          {checkResults.map((result, index) => (
            <div key={index} className="mb-4 p-2 border rounded">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{result.name}</span>
                {result.correct ? (
                  <span className="text-green-500 text-2xl">✓</span>
                ) : (
                  <span className="text-red-500 text-2xl">✗</span>
                )}
              </div>
              {!result.correct && (
                <div className="mt-2 text-sm text-gray-600">
                  Hint: {result.hint}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="btn btn-sm">Close</button>
        </div>
      </div>
    </div>
  );
}