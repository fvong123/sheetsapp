import SpreadsheetApp from "../components/SpreadsheetMain";

export default function MainApp() {
  return (
    <div className="flex flex-col h-screen bg-base-100">
      <div className="h-1/2 border-b border-base-300 shadow-md">
        <SpreadsheetApp />
      </div>
      <main className="flex-1 overflow-auto p-8 bg-base-200">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-primary">
            Welcome to Our Financial Spreadsheet App
          </h1>
          <div className="space-y-6 text-base-content">
            <p className="leading-relaxed">
              This is a powerful and intuitive spreadsheet application built
              with Next.js and React. It offers a wide range of features to help
              you organize and analyze your financial data effectively.
            </p>
            <p className="leading-relaxed">
              You can perform calculations, format cells, and even use complex
              formulas to manipulate your data. The app is designed to be
              user-friendly and responsive, ensuring a smooth experience across
              different devices.
            </p>
            <p className="leading-relaxed">
              Feel free to explore the spreadsheet above. You can start by
              clicking on any cell and entering data. To enter a formula, begin
              with an equals sign (=) followed by your formula. Use arrow keys
              to navigate between cells, and press Enter to edit a cell's
              contents.
            </p>
            <p className="leading-relaxed">
              We hope you find this tool useful for your financial management
              needs. If you have any questions or feedback, please don't
              hesitate to reach out to our support team.
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
