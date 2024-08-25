import SpreadsheetApp from "../../../components/SpreadsheetMain";

export default function MainApp() {
  return (
    <div className="flex h-screen bg-base-100">
      {/* Text content (1/4 width) */}
      <div className="w-1/4 overflow-auto p-4 bg-base-200 border-r border-base-300">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-primary">
            Transaction Assumptions 2
          </h1>
          <div className="space-y-4 text-sm text-base-content">
            <p className="leading-relaxed">
              The second thing we need is to work out how we will fund the
              transaction, which in a leveraged buyout context is a function of
              how much debt we can use. For this purpose, we will assume a
              leverage multiple, which is a representation of how much debt we
              can use, assuming a certain level of EBITDA.
              <br />
              <br />
              In practical applications, leverage multiples will be a function
              of many things such as general market conditions, bank and
              investor appetite, quality of the business, pricing of the debt
              and potential ratings implications.
              <br />
              <br />
              On the company side, a 'utility like' acquisition such as data
              centre with long dated contracts with high quality customers where
              EBITDA is highly predictable over the long term will allow a
              higher leverage multiple as compared to a 'Direct to Customer'
              consumer product company where EBITDA from year to year is
              unpredicatable.
              <br />
              <br />
              In our model, use the 'Leverage' section to complete find out the
              amount of debt we will use to fund the transaction.
            </p>
            <h2 className="text-lg font-bold mb-4 text-primary">Hint</h2>
            <p className="leading-relaxed">
              EBITDA = Revenue x EBITDA Margin <br />
              Debt = Leverage Multiple x EBITDA
            </p>
          </div>
        </div>
      </div>

      {/* SpreadsheetApp (3/4 width) */}
      <div className="w-3/4 flex flex-col">
        <div className="flex-grow overflow-auto">
          <SpreadsheetApp
            creator={false}
            initialData={10}
            nextPageLink="/simplelbo/7"
          />
        </div>
      </div>
    </div>
  );
}