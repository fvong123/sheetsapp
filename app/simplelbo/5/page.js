import SpreadsheetApp from "../../../components/SpreadsheetMain";
import Link from "next/link";

export default function MainApp() {
  return (
    <div className="flex h-screen bg-base-100">
      {/* Text content (1/4 width) */}
      <div className="w-1/4 overflow-auto p-4 bg-base-200 border-r border-base-300">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-primary">
            Transaction Assumptions 1
          </h1>
          <div className="space-y-4 text-sm text-base-content">
            <p className="leading-relaxed">
              The first thing we need to figure out is how much we are buying
              the company for. The most common way to do this in LBO modelling
              is to use a LTM EBITDA multiple.
              <br />
              <br />
              In this example, we aren't given the EBITDA directly, but we are
              given two components that can be used to determine EBITDA.
              <br />
              <br />
              In the spreadsheet, fill in the LTM Revenue number, the expected
              EBITDA margin and this should give you the LTM EBITDA number.
              <br />
              <br />
              Then, fill in the Entry Multiple and multiply these together to
              get to the Purchase Price.
              <br />
              <br />
              This is a simple, but widely used method of arriving at the
              Purchase Price.
            </p>
            <h2 className="text-lg font-bold mb-4 text-primary">Hint</h2>
            <p className="leading-relaxed">
              EBITDA = Revenue x EBITDA Margin <br />
              Purchase Price = EBITDA & Purchase Multiple
            </p>
          </div>
          <div className="mt-6">
            <Link href="/simplelbo/6">
              <button className="btn btn-primary btn-sm">Go to Next</button>
            </Link>
          </div>
        </div>
      </div>

      {/* SpreadsheetApp (3/4 width) */}
      <div className="w-3/4 flex flex-col">
        <div className="flex-grow overflow-auto">
          <SpreadsheetApp creator={false} initialData={8} />
        </div>
      </div>
    </div>
  );
}
