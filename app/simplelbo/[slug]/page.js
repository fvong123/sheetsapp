"use client"
import React, { useState, useEffect, Suspense } from 'react';
import SpreadsheetApp from "../../../components/SpreadsheetMain";
import { instruction_text } from "../data";


const LessonPage = ({params}) => {
  const [instructionText, setInstructionText] = useState(null);

  useEffect(() => {
    const pageKey = `${params.slug}`;
    if (instruction_text[pageKey]) {
      setInstructionText(instruction_text[pageKey]);
    } else {
      setInstructionText('Instructions not found for this page.');
    }
  }, [params.slug]);

  return (
    <div className="flex h-screen bg-base-100">
      {/* Left Information Pane */}
      <div className="w-1/4 p-6 overflow-y-auto bg-base-200 border-r border-base-300">
        <div className="space-y-6">
          {instructionText ? (
            <>
              {instructionText.header}
              {instructionText.content}
            </>
          ) : (
            <p>Loading instruction text...</p>
          )}
        </div>
      </div>

      {/* SpreadsheetApp (3/4 width) */}
      <div className="w-3/4 flex bg-gray-900 flex-col">
        <div className="flex-grow overflow-auto">
          <Suspense fallback={<p>Loading spreadsheet...</p>}>
            {instructionText && (
              <SpreadsheetApp
                creator={false}
                initialData={instructionText.initial_data}
                nextPageLink={instructionText.next_page}
              />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;