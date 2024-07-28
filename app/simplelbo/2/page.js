import SpreadsheetApp from "../../../components/SpreadsheetMain";

export default function MainApp() {
  return (
    <div className="flex flex-col h-screen bg-base-100">
      <div className="h-1/2 border-b border-base-300 shadow-md mb-2">
        <SpreadsheetApp creator={false} initialData={6} />
      </div>
      <main className="flex-1 overflow-auto p-8 bg-base-200">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-primary">
            Key Concept - Enterprise Value
          </h1>
          <div className="space-y-6 text-base-content">
            <p className="leading-relaxed">
              Definition: Enterprise Value is the theoretical takeover price of
              a company. It's the amount an acquirer would need to pay to take
              control of a company, assuming they would take on all of its debts
              and keep all of its cash.
              <br />
              <br />
              Importance: EV provides a more comprehensive view of a company's
              value compared to market capitalization alone. It's especially
              useful when comparing companies with different capital structures
              or when evaluating potential acquisition targets. Comparison with
              market capitalization: While market capitalization only represents
              the value of a company's equity, EV includes both equity and debt,
              providing a more holistic view of the company's value. <br />
              <br />
              Real-world example: Imagine two companies, A and B, both with a
              market cap of $100 million. Company A has no debt and $10 million
              in cash, while Company B has $50 million in debt and $5 million in
              cash. Their EVs would be: <br />
              <br />
              Company A: EV = $100M - $10M = $90M
              <br />
              <br />
              Company B: EV = $100M + $50M - $5M = $145M <br />
              <br />
              Despite having the same market cap, Company B has a higher EV due
              to its debt load.
            </p>
            <p className="leading-relaxed">
              The model is also widely used in modelling tests and investment
              banking / private equity interviews, particularly for analysts and
              associates as it covers off the key mechanics of an LBO and tests
              your intuition about the model.
            </p>
            <p className="leading-relaxed">
              In this short series, we'll cover off on a few main topics, which
              are outlined in the spreadsheet above.
            </p>
          </div>
          <div className="mt-8">
            <button className="btn btn-primary">Contact Support</button>
          </div>
        </div>
      </main>
    </div>
  );
}
