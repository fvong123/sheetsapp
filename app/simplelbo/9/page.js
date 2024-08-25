import SpreadsheetApp from "../../../components/SpreadsheetMain";

export default function MainApp() {
  return (
    <div className="flex h-screen bg-base-100">
      {/* Text content (1/4 width) */}
      <div className="w-1/4 overflow-auto p-4 bg-base-200 border-r border-base-300">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-primary">Debt Paydown</h1>
          <div className="space-y-4 text-sm text-base-content">
            <p className="leading-relaxed">
              Now that we have our forecast financials and final cash balance,
              we can calculate our debt paydown.
              <br />
              <br />
              In this example we&apos;ve used a simple assumption that debt is only
              repaid at the end of the investment period. In reality, debt
              structures are often more complex and may require paydowns each
              year.
              <br />
              <br />
              In our excel, we&apos;ve added a new section called &apos;Debt Paydown&apos;.
              We&apos;ll need to take our Initial debt, and then deduct our Final
              Cash Balance. This gives us the Ending Net Debt balance that we&apos;ll
              need to calculate returns.
              <br />
              <br />
            </p>
            <h2 className="text-lg font-bold mb-4 text-primary">Hint</h2>
            <p className="leading-relaxed">
              Ending Net Debt = Initial Debt - Final Cash Balance
            </p>
          </div>
        </div>
      </div>

      {/* SpreadsheetApp (3/4 width) */}
      <div className="w-3/4 flex flex-col">
        <div className="flex-grow overflow-auto">
          <SpreadsheetApp
            creator={false}
            initialData={13}
            nextPageLink="/simplelbo/10"
          />
        </div>
      </div>
    </div>
  );
}