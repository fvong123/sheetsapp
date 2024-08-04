import SpreadsheetApp from "../../../components/SpreadsheetMain";
import Link from "next/link";

export default function MainApp() {
  return (
    <div className="flex h-screen bg-base-100">
      {/* Text content (1/4 width) */}
      <div className="w-1/4 overflow-auto p-4 bg-base-200 border-r border-base-300">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-primary">
            Forecast Cashflows 1
          </h1>
          <div className="space-y-4 text-sm text-base-content">
            <p className="leading-relaxed">
              Now that we have our transaction assumptions finalised, we can
              jump into the meat of the model. Here we need to forecast out the
              cashflows from the business.
              <br />
              <br />
              The important thing to keep in mind is that we are{" "}
              <b>only interested in the cash implications</b>. That means that
              while it would be useful to have, we do not need a full income
              statement, or 3 statement model to forecast this.
              <br />
              <br />
              Let's take a look at what we've been given from our transaction
              assumptions. Fill in column 2024A (Actual numbers from 2024). The
              first thing we need to do is build out earnings deducting D&A and
              interest until we get to Earnings Before Tax, this allows us to
              find out what the tax cost is each year. This gives us Net Income.
              From Net Income, we add back D&A as this is a non-cash expense
              then deduct Capex, as it is a cash outflow.
              <br />
              <br />
              We'll create another line which helps us keep track of cash
              throughout the years.
              <br />
              <br />
              Additional note: The interest calculation in this model is
              immensely simplified and in most long form LBO models, there will
              be a separate section on calculating interest and debt
              amortization.
            </p>
            <h2 className="text-lg font-bold mb-4 text-primary">Hint</h2>
            <p className="leading-relaxed">
              EBITDA = Revenue x EBITDA Margin <br />
              EBIT = EBITDA - D&A <br />
              Interest = Debt x Interest Rate <br />
              EBT = EBIT - Interest <br />
              Tax = EBT x Tax Rate <br />
              Net Income = EBT - Tax <br />
              Free cash flow = Net Income + D&A - Capex
            </p>
          </div>
          <div className="mt-6">
            <Link href="/simplelbo/8">
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
