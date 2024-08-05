import SpreadsheetApp from "../../components/SpreadsheetMain";
import Link from "next/link";

export default function MainApp() {
  return (
    <div className="flex h-screen bg-base-100">
      {/* Text content (1/4 width) */}
      <div className="w-1/4 overflow-auto p-4 bg-base-200 border-r border-base-300">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-primary">Creator Mode</h1>
          <div className="space-y-4 text-sm text-base-content">
            <p className="leading-relaxed">
              Your are currently in creator mode. This is the only page where
              you will be able to create and save spreadsheets.
            </p>
            <p className="leading-relaxed">Here are some instructions.</p>
          </div>
          <div className="mt-6">
            <Link href="/">
              <button className="btn btn-primary btn-sm">Go to Home</button>
            </Link>
          </div>
        </div>
      </div>

      {/* SpreadsheetApp (3/4 width) */}
      <div className="w-3/4 flex flex-col">
        <div className="flex-grow overflow-auto">
          <SpreadsheetApp creator={true} initialData={null} />
        </div>
      </div>
    </div>
  );
}
