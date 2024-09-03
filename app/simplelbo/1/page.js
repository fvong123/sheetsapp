"use client"
import React, { useState, useEffect, Suspense } from 'react';
import SpreadsheetApp from "../../../components/SpreadsheetMain";
import { instruction_text } from "../data";


const LessonPage = () => {
  const [instructionText, setInstructionText] = useState(null);

  useEffect(() => {
    setInstructionText(instruction_text.pg1);
  }, []);

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
          <Suspense>
          <SpreadsheetApp
            creator={false}
            initialData={20}
            nextPageLink="/simplelbo/2"
          />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;