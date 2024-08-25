import SpreadsheetApp from "../../../components/SpreadsheetMain";

export default function MainApp() {
  return (
    <div className="flex h-screen bg-base-100">
      {/* Text content (1/4 width) */}
      <div className="w-1/4 overflow-auto p-4 bg-base-200 border-r border-base-300">
        <div className="space-y-6">
          <div>
            <h2 className="text-xs font-semibold text-base-content/70 uppercase">Overview of the lesson</h2>
            <h1 className="text-2xl font-bold mt-1">Welcome</h1>
            <p className="text-sm text-base-content/70 mt-1">3 min</p>
          </div>
          <div className="space-y-4 text-sm text-base-content">
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
              after takeover. The bonds issued in the buyout usually aren&apos;t
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
        </div>
      </div>

      {/* SpreadsheetApp (3/4 width) */}
      <div className="w-3/4 flex flex-col">
        <div className="flex-grow overflow-auto">
          <SpreadsheetApp
            creator={false}
            initialData={7}
            nextPageLink="/simplelbo/3"
          />
        </div>
      </div>
    </div>
  );
}