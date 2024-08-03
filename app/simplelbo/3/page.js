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
            Key Concept - Enterprise Value ("EV")
          </h1>
          <div className="space-y-6 text-base-content">
            <p className="leading-relaxed">
              Enterprise Value is the theoretical value of a company. It's also
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
              comprehensive view of a company's value by valuing its equity and
              debt, compared to market capitalization which only values the
              equity. It's particularly useful when comparing companies with
              different capital structures (i.e use more debt or less debt).
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
