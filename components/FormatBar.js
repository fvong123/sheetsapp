import React from 'react';

const FormatBar = ({ onFormatChange, currentFormat }) => {
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

  const borders = ['left', 'right', 'top', 'bottom'];

  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-100">
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
            key={border}
            onClick={() => onFormatChange({ [border + 'Border']: currentFormat[border + 'Border'] === 'black' ? 'default' : 'black' })}
            className={`btn btn-sm ${currentFormat[border + 'Border'] === 'black' ? 'btn-active' : ''}`}
          >
            {border[0].toUpperCase()}
          </button>
        ))}
      </div>

      <button
        onClick={() => onFormatChange({ fontWeight: currentFormat.fontWeight === 'bold' ? 'normal' : 'bold' })}
        className={`btn btn-sm ${currentFormat.fontWeight === 'bold' ? 'btn-active' : ''}`}
      >
        B
      </button>

      <button
        onClick={() => onFormatChange({ fontStyle: currentFormat.fontStyle === 'italic' ? 'normal' : 'italic' })}
        className={`btn btn-sm ${currentFormat.fontStyle === 'italic' ? 'btn-active' : ''}`}
      >
        I
      </button>

      <button
        onClick={() => onFormatChange({ textDecoration: currentFormat.textDecoration === 'underline' ? 'none' : 'underline' })}
        className={`btn btn-sm ${currentFormat.textDecoration === 'underline' ? 'btn-active' : ''}`}
      >
        U
      </button>
    </div>
  );
};

export default FormatBar;