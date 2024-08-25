import SpreadsheetApp from "../../components/SpreadsheetMain";
import Link from "next/link";

export default function MainApp() {
  return (
    <div className="flex h-screen bg-base-100">
      {/* Text content (1/4 width) */}
      <div className="w-1/4 overflow-auto p-4 bg-base-200 border-r border-base-300">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-primary">
            Overview of the lesson
          </h1>
          <div className="space-y-4 text-sm text-base-content">
            <p className="leading-relaxed">
              This LBO model is a simplified version of the full LBO model that
              most investment banks, private equity firms and other investment
              teams use. The reason it is popular is that you can get 80% of the
              accuracy in a very short amount of time. For example, if you were
              an analyst you could run this while listening to a company's pitch
              and very quickly get a sense of whether it is a good investment,
              given your transaction assumptions.
            </p>
            <p className="leading-relaxed">
              The model is also widely used in modelling tests and investment
              banking / private equity interviews, particularly for analysts and
              associates as it covers off the key mechanics of an LBO and tests
              your intuition about the model.
            </p>
            <p className="leading-relaxed">
              In this short series, we'll cover off on a few main topics. By the
              end of the lesson, you should be able to identify the main inputs
              of an LBO model, run a simple LBO, and arrive at the main outputs
              of Internal Rate of Return (IRR) and Multiple of Invested Capital
              (MOIC).
            </p>
          </div>
          <div className="mt-6">
            <Link href="/simplelbo/2">
              <button className="btn btn-primary btn-sm">Go to Next</button>
            </Link>
          </div>
        </div>
      </div>

      {/* SpreadsheetApp (3/4 width) */}
      <div className="w-3/4 flex flex-col">
        <div className="flex-grow overflow-auto">
          <SpreadsheetApp creator={false} initialData={17} />
        </div>
      </div>
    </div>
  );
}
