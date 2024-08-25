import React from 'react';

const ProgressIndicator = ({ checkResults }) => {
  const totalChecks = checkResults.length;
  const correctChecks = checkResults.filter(result => result.correct).length;
  
  return (
    <div className="mt-2 flex items-center">
      <progress 
        className="progress progress-primary w-56" 
        value={correctChecks} 
        max={totalChecks}
      ></progress>
      <span className="ml-2 text-sm font-medium">
        {correctChecks}/{totalChecks} correct
      </span>
    </div>
  );
};

export default ProgressIndicator;