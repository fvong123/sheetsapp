export const instruction_text = {
    welcome: { 
      initial_data: 20,
      next_page: "/simplelbo/formatting",
        content:(
        <>
          {/* Main Content */}
          <div className="prose">
            <p>This LBO model is a simplified version of the full LBO model that
              most investment banks, private equity firms and other investment
              teams use. The reason it is popular is that you can get 80% of the
              accuracy in a very short amount of time.</p> <br/><br/>
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
            <p className="prose">
              The spreadsheet on the right is a basic excel clone to help you learn modelling. In C3, lets try to enter a value. Enter 50 in the cell. Then press Enter. <br/><br/>
              Next try to enter a formula by first entering &apos;=&apos; followed by the formula you want to use. Once you enter &apos;=&apos; you can use the arrow keys to move around and select a cell to use in your formulas.
              In C4, add 50 to C3. You should see the value in C4 update to 100. <br/><br/>
              You can also use the mouse to select cells.<br/><br/>
              Finally you can change the format of cells - Change the background in C5 to dark blue. <br/><br/>
              Once you have completed those steps, click &apos;Check Answers&apos;.<br/><br/> 
              If your answers are correct, the system will let you progress by clicking &apos;Go To Next&apos;.

            </p>
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
    },formatting: { 
      initial_data: 23,
      next_page: "/simplelbo/lbo",
      header: (
        <>
        {/* HELLO WORLD Section */}
        <div>
        <h2 className="text-xs font-semibold text-base-content/70 uppercase">Before We Start</h2>
        <h1 className="text-2xl font-bold mt-1">Formatting</h1>
        <p className="text-sm text-base-content/70 mt-1">3 min</p>
      </div>
      </>
      ),
        content:(
        <>
          {/* Main Content */}
          <div className="prose">
            <p>Formatting is one of the most important things to learn in modelling. Not only does it make your model
              look neat, but it makes it easier to read and understand. When you go to build models professionally, your models
              will not just be created for you, but for multiple stakeholders such as clients, acquirors, board members, bankers etc.
              </p> <br/>
              <p className="prose">
              While each bank or firm may have its own formatting preferences, set out the formatting legend at the beginning of the model laying
              out what each type of formatting signifies. This will make your model more understandable to others. Here is an formatting that we will
              use throughout the lesson.
              <ul>
                <li>• For formulas, use black text on a white background</li>
                <li>• For a hardcode input, use blue text with a yellow background</li>
                <li>• For headings, use white text on a dark blue background</li>
                <li>• For links to other sheets, use green text on white background</li>
                <li>• Where there is a sudden change in formula that is not expected, use a red font</li>
              </ul>
            </p> <br/>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="font-semibold">Instructions</h3>
            <p className="prose">
              Nothing to do here, but we&apos;ve put together an example of what this style of formatting should look like.

            </p>
          </div>
        </>
      ),
    },
    lbo: {
      initial_data: 18,
      next_page: "/simplelbo/enterprise_value",
        header: (
            <div>
                <h2 className="text-xs font-semibold text-base-content/70 uppercase">Key Concepts</h2>
                <h1 className="text-2xl font-bold mt-1">Leveraged Buyouts</h1>
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
              after takeover. 
              <br />
              <br />
              Debt for LBOs are typically in the form of bank loans, private credit or high yield bonds.
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
            <h3 className="font-semibold">Instructions</h3>
            <p className="prose">
              In the <code className="bg-base-300 px-1 rounded">Spreadsheet</code> , place YES next to all answers that
              describe how investors generate returns in an LBO.
              <br />
              <br />
              Once you have completed the excercise, Click &apos;Check Answers&apos; and then &apos;Go To Next&apos; to continue.
            </p>
            </>
        )
        
    },
    enterprise_value: {
      initial_data: 7,
      next_page: "/simplelbo/ebitda",
      header: (
          <div>
              <h2 className="text-xs font-semibold text-base-content/70 uppercase">Key Concepts</h2>
              <h1 className="text-2xl font-bold mt-1">Enterprise Value (&quot;EV&quot;)</h1>
              <p className="text-sm text-base-content/70 mt-1">3 min</p>
        </div>
      ), content: (
          <>
          <p className="prose">
          Enterprise Value is the theoretical value of a company. It&apos;s also
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
              comprehensive view of a company&apos;s value by valuing its equity and
              debt, compared to market capitalization which only values the
              equity. It&apos;s particularly useful when comparing companies with
              different capital structures (i.e use more debt or less debt).
              <br />
              <br />
              Imagine you have a company worth $100M, it is family run and as
              such has never taken debt. It is entirely equity financed. We&apos;ll
              call this &apos;Family Run Company&apos;. Now imagine then that a Private
              Equity firm comes along and acquires this company for $100M, but
              finances that purchase by borrowing 50% of the value. We&apos;ll call
              this &apos;Private Equity Company&apos;.
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
          <h3 className="font-semibold">Instructions</h3>
          <p className="prose">
          In the Spreadsheet, work out the Enterprise Values of each
              of the companies below. We&apos;ve added the inputs of the first, but
              have left you to do the second and third. <br />
              <b>Company A:</b> Equity $50M, Debt $20M, Cash $30M <br />
              <b>Company B:</b> Equity $100M, Debt $20M, Minority Interest $10M,
              Cash $10M <br />
              <b>Company C:</b> Equity $300M
              <br />
              <br />
              Once you have completed the excercise, you can click the button
              below to continue.
          </p>
          </>
      )
      
  },  case_study: {
    initial_data: 19,
    next_page: "/simplelbo/transaction_assumptions",
    header: (
        <div>
            <h2 className="text-xs font-semibold text-base-content/70 uppercase">Case Study</h2>
            <h1 className="text-2xl font-bold mt-1">Transaction Case Study</h1>
            <p className="text-sm text-base-content/70 mt-1">3 min</p>
      </div>
    ), content: (
        <>
        <p className="prose">
        Assume that we are a private equity firm purchasing &quot;Company A&quot; at
              the end of 2024
              <br />
              <br />
              Purchase multiple is 10x LTM EBITDA
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
              
        </p>
        <h3 className="font-semibold">Instructions</h3>
        <p className="prose">
          Nothing to do on this sheet, We&apos;ll have this scenario at the bottom of each lesson on
          subsequent pages.
        </p>

        </>
    )
    
}, transaction_assumptions: {
  initial_data: 8,
  next_page: "/simplelbo/transaction_assumptions2",
  header: (
      <div>
          <h2 className="text-xs font-semibold text-base-content/70 uppercase">Building the Model</h2>
          <h1 className="text-2xl font-bold mt-1">Transaction Assumptions 1</h1>
          <p className="text-sm text-base-content/70 mt-1">3 min</p>
    </div>
  ), content: (
      <>
      <p className="prose">
      The first thing we need to figure out is how much we are buying
              the company for. The most common way to do this in LBO modelling
              is to use a LTM (Last Twelve Months) EBITDA multiple.
              <br />
              <br />
              Multiples are a widely used method of valuing a company and are typically based off two things.
              <br />
              <br />
              1. Trading comparables - look at the multiples that listed companies in the same space are trading at, this reflects the multiple for the industry and therefore
              provide a visible, liquid and traded benchmark for how to value the company we are looking at.
              <br />
              <br />
              2. Transaction comparables - these are transactions that represent how similar companies have been bought and sold in
              in the past, providing a guide as to how previous buyers and sellers have looked at valuation.
              <br />
              <br />
              By combining a combination of these, and any idiosyncracies of the current deal, the buyer and seller will arrive at a EBITDA multiple
              to buy and sell the company. While EBITDA is the most frequently used metric, there are other metrics that can be used, such as Revenue, EBIT, EBITDAR,
              ARR, etc.
              <br />
              <br />
              We have a more in depth lesson on multiples.
      </p>
      <h3 className="font-semibold">Instructions</h3>
      <p className="prose">
      In this example, we aren&apos;t given the EBITDA directly, but we are
              given two components that can be used to determine EBITDA.
              <br />
              <br />
              In the spreadsheet, fill in the LTM Revenue number, the expected
              EBITDA margin and this should give you the LTM EBITDA number.
              <br />
              <br />
              Then, fill in the Entry Multiple and multiply these together to
              get to the Purchase Price.
              <br />
              <br />
              This is a simple, but widely used method of arriving at the
              Purchase Price.
      </p>
      <h3 className="font-semibold">Formulas</h3>
      <p className="prose">
      EBITDA = Revenue x EBITDA Margin <br />
      Purchase Price = EBITDA & Purchase Multiple
      </p>
      <h3 className="font-semibold">Case Study</h3>
      <p className="prose">
        Assume that we are a private equity firm purchasing &quot;Company A&quot; at
              the end of 2024
              <br />
              <br />
              Purchase multiple is 10x LTM EBITDA
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
              
        </p>
      </>
  )
  
}, transaction_assumptions2: {
  initial_data: 10,

  next_page: "/simplelbo/forecast_cashflows1",
  header: (
      <div>
          <h2 className="text-xs font-semibold text-base-content/70 uppercase">Building the Model</h2>
          <h1 className="text-2xl font-bold mt-1">Transaction Assumptions 2</h1>
          <p className="text-sm text-base-content/70 mt-1">3 min</p>
    </div>
  ), content: (
      <>
      <p className="prose">
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
              On the company side, a &apos;utility like&apos; acquisition such as data
              centre with long dated contracts and high quality customers where
              EBITDA is highly predictable over the long term will allow a
              higher leverage multiple as compared to a &apos;Direct to Customer&apos;
              consumer product brand where EBITDA from year to year is
              unpredicatable.
      </p>
      <h3 className="font-semibold">Instructions</h3>
      <p className="prose">
      In the spreadsheet, work out the total debt used by taking the LTM EBITDA we worked out earlier and multiplying it by the leverage multiple.
      </p>
      <h3 className="font-semibold">Formulas</h3>
      <p className="prose">
      EBITDA = Revenue x EBITDA Margin <br />
              Debt = Leverage Multiple x EBITDA
      </p>
      <h3 className="font-semibold">Case Study</h3>
      <p className="prose">
        Assume that we are a private equity firm purchasing &quot;Company A&quot; at
              the end of 2024
              <br />
              <br />
              Purchase multiple is 10x LTM EBITDA
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
              
        </p>
      </>
  )
  
}, forecast_cashflows1: {
  initial_data: 11,
  next_page: "/simplelbo/forecast_cashflows2",
  header: (
      <div>
          <h2 className="text-xs font-semibold text-base-content/70 uppercase">Building the Model</h2>
          <h1 className="text-2xl font-bold mt-1">Forecast Cashflows 1</h1>
          <p className="text-sm text-base-content/70 mt-1">10 min</p>
    </div>
  ), content: (
      <>
      <p className="prose">
      The next step in this process is to set the foundations of the model. Firstly we want to map out the actual earnings of the company for the
      last full financial year. This provides a basis upon which we can forecast revenue, earnings and cashflow into the future. Secondly, we want to
      set out what those forecasts are. The approach we have taken today is somewhat simplistic with a flat revenue growth rate.
              <br />
              <br />
              
      </p>
      <h3 className="font-semibold">Instructions</h3>
      <p className="prose">
      Let&apos;s firstly fill in the build assumptions which are the forecast parameters we&apos;ve been given. Next set out the actuals for the first year.
      </p>
      <h3 className="font-semibold">Formulas</h3>
      <p className="prose">
      NA
      </p>
      <h3 className="font-semibold">Case Study</h3>
      <p className="prose">
        Assume that we are a private equity firm purchasing &quot;Company A&quot; at
              the end of 2024
              <br />
              <br />
              Purchase multiple is 10x LTM EBITDA
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
              
        </p>
      </>
  )
  
}, forecast_cashflows2: {
  initial_data: 12,
  next_page: "/simplelbo/debt_paydown",
  header: (
      <div>
          <h2 className="text-xs font-semibold text-base-content/70 uppercase">Building the Model</h2>
          <h1 className="text-2xl font-bold mt-1">Forecast Cashflows 2</h1>
          <p className="text-sm text-base-content/70 mt-1">10 min</p>
    </div>
  ), content: (
      <>
      <p className="prose">
              So we&apos;ve got our actuals, the next step is to create the forecast
              cashflows for the next 3 years.
              <br />
              <br />
              We start at the Revenue assumption, which says that Revenue is
              expected to grow $25mm each year in the forecast period, so let&apos;s
              increment Revenue by $25mm each year.
              <br />
              <br />
              Next, one of the most common methods of forecasting subsequent
              line items is to use a percentage of revenue method. This is
              because it captures the cost of scaling, which is that when you
              increase revenue, your cost base such as employees, COGS and
              investments into things like equipment will also need to grow to
              service that increased revenue.
              <br />
              <br />
              Of course, it is somewhat simplistic as it ignores any benefits of
              scaling, but generally in modelling you want to take a slightly
              conservative approach so as not to overpay on your acquisition.
              <br />
              <br />
              The important thing to keep in mind is that cash is key in an LBO model,
              as we want to make sure we always have enough cash to service debt both
              in the form of interest and mandatory amortization (repayment).
              <br />
              <br />
              Let&apos;s take a look at what we&apos;ve been given from our transaction
              assumptions. We&apos;ve also filled in the first year of the forecast. The
              first thing we need to do is build out earnings deducting D&A and
              interest until we get to Earnings Before Tax, this allows us to
              find out what the tax cost is each year. This gives us Net Income.
              From Net Income, we add back D&A as this is a non-cash expense
              then deduct Capex, as it is a cash outflow.
              <br />
              <br />
              We&apos;ll create another line which helps us keep track of cash
              throughout the years.
              <br />
              <br />
              Additional note: The interest calculation in this model is
              immensely simplified and in most long form LBO models, there will
              be a separate section on calculating interest and debt
              amortization.
      </p>
      <h3 className="font-semibold">Instructions</h3>
      <p className="prose">
      In the spreadsheet, use the first year forecast as a reference and fill in the remaining years. If you get stuck,
      check either the previous year or the formula guide below. The key thing to work out is how much cash we are generating
      each year, and how that changes the cash balance each year.
      </p>
      <p className="prose">
      EBITDA = Revenue x EBITDA Margin <br />
              EBIT = EBITDA - D&A <br />
              EBT = EBIT - Interest <br />
              Tax = EBT x Tax Rate <br />
              Net Income = EBT - Tax <br />
              Free cash flow = Net Income + D&A - Capex
      </p>
      <h3 className="font-semibold">Case Study</h3>
      <p className="prose">
        Assume that we are a private equity firm purchasing &quot;Company A&quot; at
              the end of 2024
              <br />
              <br />
              Purchase multiple is 10x LTM EBITDA
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
              
        </p>
      </>
  )
  
}, debt_paydown: {
  initial_data: 13,
  next_page: "/simplelbo/final_sale_price",
  header: (
      <div>
          <h2 className="text-xs font-semibold text-base-content/70 uppercase">Building the Model</h2>
          <h1 className="text-2xl font-bold mt-1">Debt Paydown</h1>
          <p className="text-sm text-base-content/70 mt-1">7 min</p>
    </div>
  ), content: (
      <>
      <p className="prose">
      Now that we have our forecast financials and final cash balance,
              we can calculate our debt paydown.
              <br />
              <br />
              In this example we&apos;ve used a simple assumption that debt is only
              repaid at the end of the investment period. In reality, debt
              structures are often more complex and may require paydowns each
              year.
              <br />
              <br />
              In our excel, we&apos;ve added a new section called &apos;Debt Paydown&apos;.
              We&apos;ll need to take our Initial debt, and then deduct our Final
              Cash Balance. This gives us the Ending Net Debt balance that we&apos;ll
              need to calculate returns.
              <br />
              <br />
      </p>
      <p className="prose">
      Ending Net Debt = Initial Debt - Final Cash Balance
      </p>
      <h3 className="font-semibold">Case Study</h3>
      <p className="prose">
        Assume that we are a private equity firm purchasing &quot;Company A&quot; at
              the end of 2024
              <br />
              <br />
              Purchase multiple is 10x LTM EBITDA
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
              
        </p>
      </>
  )
  
}, final_sale_price: {
  initial_data: 14,
  next_page: "/simplelbo/returns",
  header: (
      <div>
          <h2 className="text-xs font-semibold text-base-content/70 uppercase">Building the Model</h2>
          <h1 className="text-2xl font-bold mt-1">Final Sale Price</h1>
          <p className="text-sm text-base-content/70 mt-1">5 min</p>
    </div>
  ), content: (
      <>
      <p className="prose">
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
              Once again, the assumption we&apos;ve taken here is fairly simplistic
              and doesn&apos;t take into account any fees, dividends or other
              transaction mechanics you might see in an actual deal. At the end,
              we arrive at the final Enterprise Value of the sale. Since we also
              have the final Net Debt number from the previous page, we can also
              find the final Equity Value of our investment.
              <br />
              <br />
              In the Spreadsheet, we&apos;ve created a new section call &apos;Exit Value&apos;.
              To work out the Enterprise Value, we&apos;ll need to take our final
              EBITDA number (LTM EBITDA) and multiple it by our Exit Multiple
              assumption.
              <br />
              <br />
              Then to work out the final Equity Value, we&apos;ll need to deduct
              Final Net Debt from our Enterprise Value.
      </p>
      <p className="prose">
      Exit Price = LTM EBITDA x Exit Multiple
              <br />
              Equity Value = Enterprise Value - Final Net Debt
      </p>
      <h3 className="font-semibold">Case Study</h3>
      <p className="prose">
        Assume that we are a private equity firm purchasing &quot;Company A&quot; at
              the end of 2024
              <br />
              <br />
              Purchase multiple is 10x LTM EBITDA
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
              
        </p>
      </>
  )
  
}, returns: {
  initial_data: 15,
  next_page: "/simplelbo/final_model",
  header: (
      <div>
          <h2 className="text-xs font-semibold text-base-content/70 uppercase">Wrapping Up</h2>
          <h1 className="text-2xl font-bold mt-1">Investment Returns</h1>
          <p className="text-sm text-base-content/70 mt-1">5 min</p>
    </div>
  ), content: (
      <>
      <p className="prose">
      Wow, you&apos;re almost there! The final (and most important) thing we
              want to know from our investment is how much we&apos;ve made and
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
              the investment per year. Private equity firms typically target IRRs in the 20%-30% range. that
              means they grow and compound their equity investment at a rate of 20%-30% per year. Working this out
              is slightly complicated, but we&apos;ve set up the formula for you to use a trial and error approach to find the IRR.
      </p>
      <h3 className="font-semibold">Instructions</h3>
      <p className="prose">
      Using the available information, calculate the MOM and IRR for the investment. <br /><br />
      For MOM, divide the Final Equity Value by the Initial Equity Investment. Look through your inputs and see how you can work our those inputs. <br /><br />
      For IRR, we&apos;ve set up the formula for you to use a trial and error approach to find the IRR. Enter the starting equity, then have a guess at the IRR input
      to see what you get. Increase and decrease the IRR and see what the final equity value is.
      </p>
      <h3 className="font-semibold">Formulas</h3>
      <p className="prose">
        MoM = Final Equity Value / Initial Equity Investment <br />
        IRR = Initial Equity Investment x (1 + IRR)^N (where N is the number of years)
      </p>
      </>
  )
  
}, final_model: {
  initial_data: 16,
  next_page: "/simplelbo/complete",
  header: (
      <div>
          <h2 className="text-xs font-semibold text-base-content/70 uppercase">Wrapping Up</h2>
          <h1 className="text-2xl font-bold mt-1">The Complete Model</h1>
          <p className="text-sm text-base-content/70 mt-1">5 min</p>
    </div>
  ), content: (
      <>
      <p className="prose">
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
      </>
  )
  
}, ebitda: {
  initial_data: 21,
  next_page: "/simplelbo/case_study",
  header: (
      <div>
          <h2 className="text-xs font-semibold text-base-content/70 uppercase">Key Concepts</h2>
          <h1 className="text-2xl font-bold mt-1">EBITDA</h1>
          <p className="text-sm text-base-content/70 mt-1">7 min</p>
    </div>
  ), content: (
    <>
    <p className="prose">
      EBITDA (Earnings Before Interest, Taxes, Depreciation and Amortization) is a measure of a 
      company&apos;s financial performance alongside others that you may have come across such as Revenue, EBIT, EBITDAR, 
      Net Income etc. The difference between these is where the line is drawn in the Income Statement, and 
      each is used to measure things that are more important to different stakeholders and across
      companies.
      <br />
      <br />
      In a very simple income statement in the excel, we set out where each of these measures of financial
      performance sit in the income statement. <br />
      <b>Revenue</b> is the top line and represents the total amount of money the company has made from its business. <br />
      <b>COGS</b> is the cost of goods sold and is subtracted from revenue to get to Gross Profit. <br />
      <b>Gross Profit</b> is then reduced by <b>Operating Expenses</b> to get to <b>EBITDA</b>. <br />
      <b>EBITDA</b> is then reduced by <b>D&A</b> and <b>Interest Expense</b> to get to <b>EBIT</b>. <br />
      <b>EBIT</b> is then reduced by <b>Tax</b> to get to <b>Net Income</b>. <br />
      <br />
      <b>Why is EBITDA so commonly used?</b> EBITDA is commonly used as it excludes two things that can vary
      greatly between companies due to management decisions and accounting policies. These are <b>D&A</b> and <b>Interest Expense</b>. As
      we covered in the previous section, interest cost is a result of a decision around what sort of leverage
      and the mix and type of debt management prefers. Moreover, when we acquire the company through an LBO, we will most
      likely have our own preference for mix and type of debt.
      <br />
      <br />
      Finally, tax is also a noisy component as it depends on the Interest and D&A assumptions and also the company&apos;s effective tax rate, which
      can be affected by things such as country of operation, tax incentives, capital/ownership structure and more.
      <br />
      <br />
      Now if you were an investor in public equities, you would be less interested in EBITDA, and more interested in Net Income. This is because
      you have no control over the capital structure and accounting policies and so Net Income is a better reflection of what you will receive
      as a public investor.
      <br />
    </p>
    <h3 className="font-semibold">Instructions</h3>
    <p className="prose">
      In the <code className="bg-base-300 px-1 rounded">Spreadsheet</code> , we&apos;ve set up a simple income statement for you to fill in. 
      <br />
      <br />
      This excercise is more about understanding what elements are INCLUDED and EXCLUDED for each of these financial measures. As you get to each earnings
      measure, think about WHY you would care about each of these and in what situations.
      <br />
      <br />
      Maths wise, simply subtract the additional expenses from the prior line item to get to the next.
      <br />
      <br />
      Once you have completed the excercise, Click &apos;Check Answers&apos; and then &apos;Go To Next&apos; to continue.
    </p>
    </>
  )
  
}
}