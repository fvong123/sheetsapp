import SpreadsheetApp from "../../../components/SpreadsheetMain";
import Link from "next/link";

export default function MainApp() {
  return (
    <div className="flex flex-col h-screen bg-base-100">
      <div className="h-1/2 border-b border-base-300 shadow-md mb-2">
        <SpreadsheetApp creator={false} initialData={7} />
      </div>
      <main className="flex-1 overflow-auto p-8 bg-base-200">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-primary">
            Transaction Case Study
          </h1>
          <div className="space-y-6 text-base-content">
            <p className="leading-relaxed">
              Assume that we are a private equity firm purchasing "Company A" at
              the end of 2024
              <br />
              <br />
              Purchase multiple is 10x LTM EBITDA
              <br />
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
              <b>Comparison with market capitalization: </b>While market
              capitalization only represents the value of a company's equity, EV
              includes both equity and debt, providing a more holistic view of
              the company's value. <br />
              <br />
              Imagine you have a company worth $100M, it is family run and as
              such has never taken debt. It is entirely equity financed. We'll
              call this 'Family Run Company. Now imagine then that a Private
              Equity firm comes along and acquires this company for $100M, but
              finances that purchase by borrowing 50% of the value. We'll call
              this 'Private Equity Company'.
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
              of the companies below: <br />
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
          <div className="mt-8">
            <Link href="/simplelbo/4">
              <button className="btn btn-primary">Go to Next</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
