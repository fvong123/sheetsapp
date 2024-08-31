import Link from 'next/link';

export default function MainApp() {
    return (
      <div className="flex justify-center items-start min-h-screen bg-gray-100 py-12">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="md:w-1/2">
                <div className="mb-4">
                  <span className="bg-blue-900 text-white px-3 py-1 rounded-full text-sm">Free Course</span>
                </div>
                <h1 className="text-4xl font-bold mb-4">Learn a Basic LBO Model</h1>
                <p className="mb-6">
                  Walk through the process of building a simple LBO model that incorporates all the primary concepts.
                </p>
                <Link href="/simplelbo/1" className="btn btn-primary">Start Lesson</Link>
              </div>
              
              <div className="md:w-1/2 mt-8 md:mt-0">
                <div className="border border-gray-300 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">This course includes</h2>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="mr-2">🤖</span>
                      Key concepts of an LBO model
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">🛠️</span>
                      Basic LBO model structure
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">📝</span>
                      Debt paydown and cashflow forecasts
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">🎓</span>
                      Exit and returns analysis
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-12 border border-gray-300 rounded-lg p-6">
              <div className="flex flex-wrap justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <span className="mr-2">📊</span>
                  <div>
                    <p className="text-sm text-gray-600">Skill level</p>
                    <p className="font-semibold">Beginner</p>
                  </div>
                </div>
                <div className="flex items-center mb-4 md:mb-0">
                  <span className="mr-2">⏱️</span>
                  <div>
                    <p className="text-sm text-gray-600">Time to complete</p>
                    <p className="font-semibold">1 hour</p>
                  </div>
                </div>
                <div className="flex items-center mb-4 md:mb-0">
                  <span className="mr-2">🛠️</span>
                  <div>
                    <p className="text-sm text-gray-600">Projects</p>
                    <p className="font-semibold">1</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📋</span>
                  <div>
                    <p className="text-sm text-gray-600">Prerequisites</p>
                    <p className="font-semibold">1 course</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }