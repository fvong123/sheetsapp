import SpreadsheetApp from "../../../components/SpreadsheetMain";
import Link from "next/link";

export default function MainApp() {
  return (
    <div className="flex h-screen bg-base-100">
      {/* Text content (1/4 width) */}
      <div className="w-1/4 overflow-auto p-4 bg-base-200 border-r border-base-300">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-primary">
            Final Sale Price
          </h1>
          <div className="space-y-4 text-sm text-base-content">
            <p className="leading-relaxed">
              At the end of the investment period, private equity companies can
              either sell the asset to another investor, sell to a strategic or
              even list the company on the stock market through an IPO. In this
              example, we assume that the company is sold to another acquiror.
              <br />
              <br />
              A very common assumption when doing these kinds of calculations is
              to use the same exit multiple as your entry multiple. The creates
              a conservative exit price where no mulitple expansion is factored
              in.
              <br />
              <br />
              Once again, the assumption we've taken here is fairly simplistic
              and doesn't take into account any fees, dividends or other
              transaction mechanics you might see in an actual deal. At the end,
              we arrive at the final Enterprise Value of the sale. Since we also
              have the final Net Debt number from the previous page, we can also
              find the final Equity Value of our investment.
              <br />
              <br />
              In the Spreadsheet, we've created a new section call 'Exit Value'.
              To work out the Enterprise Value, we'll need to take our final
              EBITDA number (LTM EBITDA) and multiple it by our Exit Multiple
              assumption.
              <br />
              <br />
              Then to work out the final Equity Value, we'll need to deduct
              Final Net Debt from our Enterprise Value.
            </p>
            <h2 className="text-lg font-bold mb-4 text-primary">Hint</h2>
            <p className="leading-relaxed">
              Exit Price = LTM EBITDA x Exit Multiple
              <br />
              Equity Value = Enterprise Value - Final Net Debt
            </p>
          </div>
          <div className="mt-6">
            <Link href="/simplelbo/11">
              <button className="btn btn-primary btn-sm">Go to Next</button>
            </Link>
          </div>
        </div>
      </div>

      {/* SpreadsheetApp (3/4 width) */}
      <div className="w-3/4 flex flex-col">
        <div className="flex-grow overflow-auto">
          <SpreadsheetApp creator={false} initialData={14} />
        </div>
      </div>
    </div>
  );
}
