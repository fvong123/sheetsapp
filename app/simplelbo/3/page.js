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
            <h2 className="text-xs font-semibold text-base-content/70 uppercase">Key Concept</h2>
            <h1 className="text-2xl font-bold mt-1">Enterprise Value ("EV")</h1>
            <p className="text-sm text-base-content/70 mt-1">5 min</p>
          </div>

          {/* Main Content */}
          <div className="prose">
            <p className="leading-relaxed">
              Enterprise Value is the theoretical value of a company. It&apos;s also
              the amount an acquirer would need to pay to take control of said
              company, assuming they would discharge all of its debts and keep
              all of its cash.
              <br />
              <br />
              The formula for Enterprise Value is: Equity (Market Capitlization)
              + Debt + Minority Interest - Cash and cash equivalents
              <br />
              <br />
              <b>Why not Market Capitalization?</b> EV provides a more
              comprehensive view of a company&apos;s value by valuing its equity and
              debt, compared to market capitalization which only values the
              equity. It&apos;s particularly useful when comparing companies with
              different capital structures (i.e use more debt or less debt).
              <br />
              <br />
              Imagine you have a company worth $100M, it is family run and as
              such has never taken debt. It is entirely equity financed. We&apos;ll
              call this &apos;Family Run Company&apos;. Now imagine then that a Private
              Equity firm comes along and acquires this company for $100M, but
              finances that purchase by borrowing 50% of the value. We&apos;ll call
              this &apos;Private Equity Company&apos;.
              <br />
              <br />
              Family Run Company: Equity: $100M + Debt $0M = EV: $100m
              <br />
              <br />
              Private Equity Company: Equity: $50M + Debt $50M = EV: $100m
              <br />
              <br />
              As you can see, it is exactly the same company and the total value
              should not change immediately once it has been bought by someone
              else, but how that value is financed makes it difficult to compare
              with Market Capitalization (just equity) and easy to compare with
              Enterprise Value.
            </p>
            <p className="leading-relaxed">
              In the Spreadsheet above, work out the Enterprise Values of each
              of the companies below. We&apos;ve added the inputs of the first, but
              have left you to do the second and third. <br />
              <b>Company A:</b> Equity $50M, Debt $20M, Cash $30M <br />
              <b>Company B:</b> Equity $100M, Debt $20M, Minority Interest $10M,
              Cash $10M <br />
              <b>Company C:</b> Equity $300M
              <br />
              <br />
              Once you have completed the excercise, you can click the button
              below to continue.
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
            nextPageLink="/simplelbo/4"
          />
        </div>
      </div>
    </div>
  );
}