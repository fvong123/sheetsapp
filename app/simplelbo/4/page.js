import SpreadsheetApp from "../../../components/SpreadsheetMain";
import Link from "next/link";

export default function MainApp() {
  return (
    <div className="flex h-screen bg-base-100">
      {/* Text content (1/4 width) */}
      <div className="w-1/4 overflow-auto p-4 bg-base-200 border-r border-base-300">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-primary">
            Transaction Case Study
          </h1>
          <div className="space-y-4 text-sm text-base-content">
            <p className="leading-relaxed">
              Assume that we are a private equity firm purchasing "Company A" at
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
              We'll have this scenario at the bottom of each lesson on
              subsequent pages.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/simplelbo/5">
              <button className="btn btn-primary btn-sm">Go to Next</button>
            </Link>
          </div>
        </div>
      </div>

      {/* SpreadsheetApp (3/4 width) */}
      <div className="w-3/4 flex flex-col">
        <div className="flex-grow overflow-auto">
          <SpreadsheetApp creator={false} initialData={7} />
        </div>
      </div>
    </div>
  );
}
