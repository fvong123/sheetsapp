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
              Wow, you're almost there! The final (and most important) thing we
              want to know from our investment is how much we've made and
              typical private equity firms use two main metrics to measure
              returns.
              <br />
              <br />
              The first is Mulitple of Money (MOM) which is simply how many
              times the initial investment the final return of the investment
              made. To work this out, we take the Final Equity Value and divide
              by the initial Equity Investment.
              <br />
              <br />
              The second is Internal Rate of Return (IRR) which is the return of
              the investment per year. This is slightly complicated to work out
              as it requires us to backsolve the IRR through trial and error, or
              through goal-seek in excel. We'll show you two ways to work it
              out.
              <br />
              <br />
              The rule of thumb is that for "double your money" scenarios, you
              take 100%, divide by the # of years, and then estimate the IRR as
              about 75-80% of that value. For example, if you double your money
              in 3 years, 100% / 3 = 33%. 75% of 33% is about 25%, which is the
              approximate IRR in this case.
              <br />
              <br />
              The second method is to take your initial Equity Investment, and
              set a variable x as IRR, then multiply your initial Equity
              Investment by that IRR to get a final Equity Value. Keep changing
              your variable x until you get the exact final Equity Value as your
              model.
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
            initialData={15}
            nextPageLink="/simplelbo/12"
          />
        </div>
      </div>
    </div>
  );
}
