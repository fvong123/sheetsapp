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
            Overview of the lesson
          </h1>
          <div className="space-y-6 text-base-content">
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
