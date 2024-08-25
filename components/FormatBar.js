import React from 'react';

const FormatBar = ({ onFormatChange, currentFormat, onCreateChecks, onCheckAnswers, creator }) => {
  const fontColors = [
    { name: 'Default', value: 'default' },
    { name: 'White', value: 'white' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Red', value: 'red' },
    { name: 'Green', value: 'green' },
    { name: 'Black', value: 'black' },
  ];
  const backgroundColors = [
    { name: 'Default', value: 'default' },
    { name: 'Dark Blue', value: '#00008B' },
    { name: 'Light Blue', value: '#ADD8E6' },
    { name: 'Grey', value: '#808080' },
    { name: 'Highlighter Yellow', value: '#FFFF00' },
  ];
  const borders = [
    { name: 'left', label: 'L' },
    { name: 'right', label: 'R' },
    { name: 'top', label: 'T' },
    { name: 'bottom', label: 'B' },
  ];

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <select 
          onChange={(e) => onFormatChange({ backgroundColor: e.target.value })}
          value={currentFormat.backgroundColor || 'default'}
          className="select select-bordered select-sm"
        >
          <option value="default">Background</option>
          {backgroundColors.map(color => (
            <option key={color.value} value={color.value}>{color.name}</option>
          ))}
        </select>
        <select 
          onChange={(e) => onFormatChange({ color: e.target.value })}
          value={currentFormat.color || 'default'}
          className="select select-bordered select-sm"
        >
          <option value="default">Font Color</option>
          {fontColors.map(color => (
            <option key={color.value} value={color.value}>{color.name}</option>
          ))}
        </select>
        <div className="border rounded p-1 flex items-center">
          <span className="text-xs mr-2">Borders</span>
          <div className="flex space-x-1">
            {borders.map(border => (
              <button
                key={border.name}
                onClick={() => onFormatChange({ [border.name + 'Border']: currentFormat[border.name + 'Border'] === 'black' ? 'default' : 'black' })}
                className={`btn btn-xs w-6 h-6 flex items-center justify-center ${currentFormat[border.name + 'Border'] === 'black' ? 'btn-active' : ''}`}
              >
                {border.label}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => onFormatChange({ fontWeight: currentFormat.fontWeight === 'bold' ? 'normal' : 'bold' })}
          className={`btn btn-sm w-8 h-8 flex items-center justify-center ${currentFormat.fontWeight === 'bold' ? 'btn-active' : ''}`}
        >
          𝐁
        </button>
        <button
          onClick={() => onFormatChange({ fontStyle: currentFormat.fontStyle === 'italic' ? 'normal' : 'italic' })}
          className={`btn btn-sm w-8 h-8 flex items-center justify-center ${currentFormat.fontStyle === 'italic' ? 'btn-active' : ''}`}
        >
          𝐼
        </button>
        <button
          onClick={() => onFormatChange({ textDecoration: currentFormat.textDecoration === 'underline' ? 'none' : 'underline' })}
          className={`btn btn-sm w-8 h-8 flex items-center justify-center ${currentFormat.textDecoration === 'underline' ? 'btn-active' : ''}`}
        >
          U̲
        </button>
      </div>

      <div className="flex items-center space-x-2">
        {creator && (
          <button
            className="btn btn-sm btn-primary"
            onClick={onCreateChecks}
          >
            Create Checks
          </button>
        )}
      </div>
    </div>
  );
};

export default FormatBar;