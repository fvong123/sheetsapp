import SpreadsheetApp from "../../components/SpreadsheetMain";
import SpreadsheetText from "../../components/SpreadsheetText";

export default function MainApp() {
  return (
    <div className="flex flex-col h-screen bg-base-100">
      <div className="h-1/2 border-b border-base-300 shadow-md mb-2">
        <SpreadsheetApp creator={true} initialData={null} />
      </div>
      <main className="flex-1 overflow-auto p-8 bg-base-200">
        <SpreadsheetText />
      </main>
    </div>
  );
}
