import Link from 'next/link';

export default function CourseTemplate({details}) {
    const isDisabled = details.disabled === true;

    return (
      <div className="flex justify-center items-start bg-gray-100 py-8">
        <div className={`w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden ${isDisabled ? 'opacity-50' : ''}`}>
          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="md:w-1/2">
                <div className="mb-4">
                  <span className="bg-blue-900 text-white px-3 py-1 rounded-full text-sm">{details.type}</span>
                </div>
                <h1 className="text-4xl font-bold mb-4">{details.heading}</h1>
                <p className="mb-6">
                  {details.description}
                </p>
                <Link 
                  href={isDisabled ? '#' : "/simplelbo/welcome"} 
                  className={`btn ${isDisabled ? 'btn-disabled cursor-not-allowed' : 'btn-primary'}`}
                  onClick={(e) => isDisabled && e.preventDefault()}
                >
                  Start Lesson
                </Link>
              </div>
              
              <div className="md:w-1/2 mt-8 md:mt-0">
                <div className="border border-gray-300 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">This course includes</h2>
                  <ul className="space-y-3">
                    {details.features.replace(/'/g, '').split(',').map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">{['🤖', '🛠️', '📝', '🎓'][index % 4]}</span>
                        {feature.trim()}
                      </li>
                    ))}
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
                    <p className="font-semibold">{details.skill_level}</p>
                  </div>
                </div>
                <div className="flex items-center mb-4 md:mb-0">
                  <span className="mr-2">⏱️</span>
                  <div>
                    <p className="text-sm text-gray-600">Time to complete</p>
                    <p className="font-semibold">{details.time_to_complete}</p>
                  </div>
                </div>
                <div className="flex items-center mb-4 md:mb-0">
                  <span className="mr-2">🛠️</span>
                  <div>
                    <p className="text-sm text-gray-600">Projects</p>
                    <p className="font-semibold">{details.projects}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📋</span>
                  <div>
                    <p className="text-sm text-gray-600">Prerequisites</p>
                    <p className="font-semibold">{details.prerequisites}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }