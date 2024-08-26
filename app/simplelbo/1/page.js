
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
          {/* Video Walkthrough */}
          {/* <div>
            <h3 className="font-semibold flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Video Walkthrough
            </h3>
            <p className="mt-2">If you get stuck during this lesson or would like to see an experienced developer work through the lesson, watch this lesson walkthrough video</p>
          </div> */}

          {/* Concept Review */}
          {/* <div>
            <h3 className="font-semibold">Concept Review</h3>
            <p className="mt-2">Want to quickly review some of the concepts you've been learning? Take a look at this material's cheatsheet!</p>
          </div> */}

          {/* Community Forums */}
          {/* <div>
            <h3 className="font-semibold">Community Forums</h3>
            <p className="mt-2">Here are some helpful links to the top questions asked by coders about this exercise:</p>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center justify-between">
                <span>Why do I need to enter my name on a different line?</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </li>
              <li className="flex items-center justify-between">
                <span>How can I use an integer in a print function?</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </li>
            </ul>
            <p className="mt-4">Still have questions? View this exercise's thread in the Codecademy Forums.</p>
          </div> */}
        </div>
      </div>

      {/* SpreadsheetApp (3/4 width) */}
      <div className="w-3/4 flex bg-gray-900 flex-col">
        <div className="flex-grow overflow-auto">
          <Suspense>
          <SpreadsheetApp
            creator={false}
            initialData={7}
            nextPageLink="/simplelbo/2"
          />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;