import { useState } from 'react';
import './SelectButtonGroup.scss';

const SelectButtonGroup = ({ options = [], onChange, defaultValue = null }) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleClick = (value) => {
    setSelected(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="select-button-group">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`select-button ${selected === option.value ? 'selected' : ''}`}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SelectButtonGroup;
