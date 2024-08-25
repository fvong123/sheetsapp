import Link from 'next/link';

export default function MainApp() {
    return (
      <div className="flex flex-col h-screen bg-base-100 p-8">
        <h1 className="text-3xl font-bold mb-4">Simple LBO Course</h1>
        <p className="mb-4">Welcome to our Simple Leveraged Buyout (LBO) course. This course will cover the following topics:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Introduction to Leveraged Buyouts</li>
          <li>Key components of an LBO model</li>
          <li>Basic LBO model structure</li>
          <li>Debt and equity financing in LBOs</li>
          <li>Cash flow projections and debt repayment</li>
          <li>Exit strategies and returns analysis</li>
          <li>Simple case study walkthrough</li>
        </ul>
        <p>By the end of this course, you&apos;ll have a solid understanding of LBO basics and be able to create a simple LBO model.</p>
        <Link href="/simplelbo/1" className="mt-6">
        <button className="btn btn-primary">Start Course</button>
      </Link>
      </div>
    );
  }