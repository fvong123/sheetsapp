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
            Key Concept - Leveraged Buyout ("LBO")
          </h1>
          <div className="space-y-6 text-base-content">
            <p className="leading-relaxed">
              A leveraged buyout (LBO) is the acquisition of one company by
              another using a significant amount of borrowed money to meet the
              cost of acquisition. The borrowed money can be in the form of
              bonds or loans. The assets of the company being acquired are often
              used as collateral for the loans along with the assets of the
              acquiring company.
              <br />
              <br />
              In an LBO, the ratio of debt to equity used for the takeover will
              be as high as possible. The exact amount of debt that will be used
              depends on the market lending conditions, investor appetite, and
              the amount of cash flow that the company is expected to generate
              after takeover. The bonds issued in the buyout usually aren't
              investment grade and are referred to as junk bonds because of this
              high debt/equity ratio.
              <br />
              <br />
              Returns are generated in an LBO through:
              <br />
            </p>
            <ul>
              <li>
                The company pays down its debt and this deleveraging increases
                the amount of equity in the company.
              </li>
              <li>
                Investors are able to improve profit margins by reducing or
                eliminating unnecessary expenditures and improving sales.
              </li>
              <li>
                The company will be sold at the end of the investment period at
                a higher multiple than the investment company paid, a process
                called margin expansion.
              </li>
            </ul>
            <p className="leading-relaxed">
              Private equity investment groups that carry out LBOs have garnered
              a reputation for being ruthless and predatory because of their
              need to rapidly increase margins. To do this, many investors
              embark on strict cost-cutting measures that can include making
              staff redundant.
              <br />
              <br />
              In the Spreadsheet above, place YES next to all answers that
              describe how investors make money in an LBO.
              <br />
              <br />
              Once you have completed the excercise, you can click the button
              below to continue.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/simplelbo/3">
              <button className="btn btn-primary">Go to Next</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
