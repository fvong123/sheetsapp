import React from 'react';
import SpreadsheetApp from "../../../components/SpreadsheetMain";

export default function MainApp() {
  return (
    <div className="flex h-screen bg-base-100">
      {/* Left Information Pane */}
      <div className="w-1/4 p-6 overflow-y-auto bg-base-200 border-r border-base-300">
        <div className="space-y-6">
          {/* Title Section */}
          <div>
            <h2 className="text-xs font-semibold text-base-content/70 uppercase">Case Study</h2>
            <h1 className="text-2xl font-bold mt-1">Transaction Case Study</h1>
            <p className="text-sm text-base-content/70 mt-1">5 min</p>
          </div>

          {/* Main Content */}
          <div className="prose">
            <p className="leading-relaxed">
              Assume that we are a private equity firm purchasing &quot;Company A&quot; at
              the end of 2024
              <br />
              <br />
              Purchase multiple is 10x LTM EBITDA
              <br />
              The Company has the following: <br />
              $200mm of Revenue in 2024 and expected to grow at $25mm annually
              through the forecast period. <br />
              EBITDA margins are 50% which remain flat. <br />
              D&A and Capex are both 10% of revenues and flat throughout the
              forecast period. <br />
              There is no change in net working capital year to year. <br />
              The tax rate is 50% <br />
              The initial leverage is 5x LTM EBITDA <br />
              The interest rate on debt is 10% p.a. <br />
              We expect to exit this investment in 3 years at a 10x LTM EBITDA
              multiple.
              <br />
              <br />
              We&apos;ll have this scenario at the bottom of each lesson on
              subsequent pages.
            </p>
          </div>
        </div>
      </div>

      {/* SpreadsheetApp (3/4 width) */}
      <div className="w-3/4 flex bg-gray-900 flex-col">
        <div className="flex-grow overflow-auto">
          <SpreadsheetApp
            creator={false}
            initialData={7}
            nextPageLink="/simplelbo/5"
          />
        </div>
      </div>
    </div>
  );
}