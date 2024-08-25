import React from 'react';
import SpreadsheetApp from "../../../components/SpreadsheetMain";

const LessonPage = () => {
  return (
    <div className="flex h-screen bg-base-100">
      {/* Left Information Pane */}
      <div className="w-1/4 p-6 overflow-y-auto bg-base-200 border-r border-base-300">
        <div className="space-y-6">
          {/* HELLO WORLD Section */}
          <div>
            <h2 className="text-xs font-semibold text-base-content/70 uppercase">Overview of the lesson</h2>
            <h1 className="text-2xl font-bold mt-1">Welcome</h1>
            <p className="text-sm text-base-content/70 mt-1">3 min</p>
          </div>

          {/* Main Content */}
          <div className="prose">
            <p>This LBO model is a simplified version of the full LBO model that
              most investment banks, private equity firms and other investment
              teams use. The reason it is popular is that you can get 80% of the
              accuracy in a very short amount of time. For example, if you were
              an analyst you could run this while listening to a company's pitch
              and very quickly get a sense of whether it is a good investment,
              given your transaction assumptions.</p> <br/><br/>
              <p className="prose">
              The model is also widely used in modelling tests and investment
              banking / private equity interviews, particularly for analysts and
              associates as it covers off the key mechanics of an LBO and tests
              your intuition about the model.
            </p> <br/><br/>
            <p className="prose">
              In this short series, we'll cover off on a few main topics. By the
              end of the lesson, you should be able to identify the main inputs
              of an LBO model, run a simple LBO, and arrive at the main outputs
              of Internal Rate of Return (IRR) and Multiple of Invested Capital
              (MOIC).
            </p>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="font-semibold">Instructions</h3>
            <p className="mt-2">Change <code className="bg-base-300 px-1 rounded">codecademy</code> to your name in the script to the right. Run the code to see what it does!</p>
            <p className="mt-2">As soon as you're ready, move on to the next exercise to begin learning to write your own Python programs!</p>
          </div>

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
          <SpreadsheetApp
            creator={false}
            initialData={7}
            nextPageLink="/simplelbo/3"
          />
        </div>
      </div>
    </div>
  );
};

export default LessonPage;