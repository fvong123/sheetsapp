import SpreadsheetApp from "../../../components/SpreadsheetMain";

export default function MainApp() {
  return (
    <div className="flex h-screen bg-base-100">
      {/* Text content (1/4 width) */}
      <div className="w-1/4 overflow-auto p-4 bg-base-200 border-r border-base-300">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-primary">
            Investment Returns
          </h1>
          <div className="space-y-4 text-sm text-base-content">
            <p className="leading-relaxed">
              Congratulations! You have successfully completed your first LBO
              Model.
              <br />
              <br />
              While very simple, it demonstrates the key mechanics of LBO
              models, and the key return drivers.
              <br />
              <br />
              To recap, Private Equity firms earn returns through three main
              drivers in LBOS. <br />
              Firstly, The company pays down its debt and this deleveraging
              increases the amount of equity in the company.
              <br />
              Investors are able to improve margins by reducing or eliminating
              unnecessary expenditures and improving sales.
              <br />
              The company will be sold at the end of the investment period at a
              higher multiple than the investment company paid, a process called
              margin expansion.
              <br />
              <br />
              Private Equity firms use two primary metrics to evaluate their
              returns. These are Internal Rate of Return (IRR) and the Multiple
              of Money (MOM).
              <br />
              <br />
              We&apos;re putting together more advanced modelling courses to stay
              tuned!
            </p>
            <h2 className="text-lg font-bold mb-4 text-primary">Hint</h2>
            <p className="leading-relaxed">
              Exit Price = LTM EBITDA x Exit Multiple
              <br />
              Equity Value = Enterprise Value - Final Net Debt
            </p>
          </div>
        </div>
      </div>

      {/* SpreadsheetApp (3/4 width) */}
      <div className="w-3/4 flex flex-col">
        <div className="flex-grow overflow-auto">
          <SpreadsheetApp
            creator={false}
            initialData={16}
            nextPageLink="/simplelbo"
          />
        </div>
      </div>
    </div>
  );
}