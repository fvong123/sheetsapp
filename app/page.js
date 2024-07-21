import SpreadsheetApp from "../components/SpreadsheetMain";

export default function MainApp() {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-1/2">
        <SpreadsheetApp />
      </div>
      <main className="flex-1 overflow-auto p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to Our Spreadsheet App
        </h1>
        <p className="mb-4">
          This is a powerful and intuitive spreadsheet application built with
          Next.js and React. It offers a wide range of features to help you
          organize and analyze your data effectively.
        </p>
        <p className="mb-4">
          You can perform calculations, format cells, and even use complex
          formulas to manipulate your data. The app is designed to be
          user-friendly and responsive, ensuring a smooth experience across
          different devices.
        </p>
        <p className="mb-4">
          Feel free to explore the spreadsheet below. You can start by clicking
          on any cell and entering data. To enter a formula, begin with an
          equals sign (=) followed by your formula. Use arrow keys to navigate
          between cells, and press Enter to edit a cell's contents.
        </p>
        <p>
          We hope you find this tool useful for your data management needs. If
          you have any questions or feedback, please don't hesitate to reach out
          to our support team.
        </p>
      </main>
    </div>
  );
}
