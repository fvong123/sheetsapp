import React from 'react';

const FormatBar = ({ onFormatChange, currentFormat, onCreateChecks, creator }) => {
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
    { name: 'left', symbol: '▏', className: 'border-left-button' },
    { name: 'right', symbol: '▕' },
    { name: 'top', symbol: '▔' },
    { name: 'bottom', symbol: '▁' },
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
        <div className="flex space-x-1">
          {borders.map(border => (
            <button
              key={border.name}
              onClick={() => onFormatChange({ [border.name + 'Border']: currentFormat[border.name + 'Border'] === 'black' ? 'default' : 'black' })}
              className={`btn btn-sm w-8 h-8 flex items-center justify-center relative ${border.className || ''} ${currentFormat[border.name + 'Border'] === 'black' ? 'btn-active' : ''}`}
            >
              <span className="absolute left-2">{border.symbol}</span>
            </button>
          ))}
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

      {creator && (
        <button
          className="btn btn-sm btn-primary"
          onClick={onCreateChecks}
        >
          Create Checks
        </button>
      )}
    </div>
  );
};

export default FormatBar;