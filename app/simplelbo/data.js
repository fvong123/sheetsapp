export const instruction_text = {
    pg1: { 
        content:(
        <>
          {/* Main Content */}
          <div className="prose">
            <p>This LBO model is a simplified version of the full LBO model that
              most investment banks, private equity firms and other investment
              teams use. The reason it is popular is that you can get 80% of the
              accuracy in a very short amount of time. For example, if you were
              an analyst you could run this while listening to a company&apos;s pitch
              and very quickly get a sense of whether it is a good investment,
              given your transaction assumptions.</p> <br/><br/>
              <p className="prose">
              The model is also widely used in modelling tests and investment
              banking / private equity interviews, particularly for analysts and
              associates as it covers off the key mechanics of an LBO and tests
              your intuition about the model.
            </p> <br/><br/>
            <p className="prose">
              In this short series, we&apos;ll cover off on a few main topics. By the
              end of the lesson, you should be able to identify the main inputs
              of an LBO model, run a simple LBO, and arrive at the main outputs
              of Internal Rate of Return (IRR) and Multiple of Invested Capital
              (MOIC).
            </p>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="font-semibold">Instructions</h3>
            <p className="mt-2">Change <code className="bg-base-300 px-1 rounded">codecademy</code> to your name in the script to the right. Run the code to see what it does!</p>
            <p className="mt-2">As soon as you&apos;re ready, move on to the next exercise to begin learning to write your own Python programs!</p>
          </div>
        </>
      ),
      header: (
        <>
        {/* HELLO WORLD Section */}
        <div>
        <h2 className="text-xs font-semibold text-base-content/70 uppercase">Overview of the lesson</h2>
        <h1 className="text-2xl font-bold mt-1">Welcome</h1>
        <p className="text-sm text-base-content/70 mt-1">3 min</p>
      </div>
      </>
      ),
    },
    pg2: {
        header: (
            <div>
                <h2 className="text-xs font-semibold text-base-content/70 uppercase">Overview of the lesson</h2>
                <h1 className="text-2xl font-bold mt-1">Welcome</h1>
                <p className="text-sm text-base-content/70 mt-1">3 min</p>
          </div>
        ), content: (
            <>
            <p className="prose">
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
            <p className="prose">
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
            </>
        )
        
    }
}