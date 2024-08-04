import SpreadsheetApp from "../../../components/SpreadsheetMain";
import Link from "next/link";

export default function MainApp() {
  return (
    <div className="flex h-screen bg-base-100">
      {/* Text content (1/4 width) */}
      <div className="w-1/4 overflow-auto p-4 bg-base-200 border-r border-base-300">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-primary">
            Forecast Cashflows 2
          </h1>
          <div className="space-y-4 text-sm text-base-content">
            <p className="leading-relaxed">
              So we've got our actuals, the next step is to create the forecast
              cashflows for the next 3 years.
              <br />
              <br />
              We start at the Revenue assumption, which says that Revenue is
              expected to grow $25mm each year in the forecast period, so let's
              increment Revenue by $25mm each year.
              <br />
              <br />
              Next, one of the most common methods of forecasting subsequent
              line items is to use a percentage of revenue method. This is
              because it captures the cost of scaling, which is that when you
              increase revenue, your cost base such as employees, COGS and
              investments into things like equipment will also need to grow to
              service that increased revenue.
              <br />
              <br />
              Of course, it is somewhat simplistic as it ignores any benefits of
              scaling, but generally in modelling you want to take a slightly
              conservative approach so as not to overpay on your acquisition.
              <br />
              <br />
              From here, work out each line item according to the assumptions.
            </p>
            <h2 className="text-lg font-bold mb-4 text-primary">Hint</h2>
            <p className="leading-relaxed">
              EBITDA = Revenue x EBITDA Margin <br />
              EBIT = EBITDA - D&A <br />
              EBT = EBIT - Interest <br />
              Tax = EBT x Tax Rate <br />
              Net Income = EBT - Tax <br />
              Free cash flow = Net Income + D&A - Capex
            </p>
          </div>
          <div className="mt-6">
            <Link href="/simplelbo/9">
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
