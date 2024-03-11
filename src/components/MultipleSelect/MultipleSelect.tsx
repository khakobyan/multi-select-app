import React, { useState } from 'react';
import './styles.css';

interface Option {
  value: string;
  label: string;
}

interface MultipleSelectProps {
  options: Option[];
}

const MultipleSelect: React.FC<MultipleSelectProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setSearchValue('');
  };

  const handleSelectOption = (value: string) => {
    const index = selectedValues.indexOf(value);
    if (index === -1) {
      setSelectedValues([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues.filter(val => val !== value));
    }
  };

  const handleClearAll = () => {
    setSelectedValues([]);
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="multi-select">
      <div className="selected-values" onClick={toggleDropdown}>
        <div className="selected-content" aria-label='select-options'>
          {selectedValues.length === 0 ? 'Select options' : selectedValues.join(', ')}
        </div>
        {selectedValues.length > 0 && (
          <button className="clear-all-button" onClick={handleClearAll}>Clear All</button>
        )}
      </div>
      {isOpen && (
        <div className="dropdown">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
          <ul>
            {filteredOptions.map(option => (
              <li 
                key={option.value}
                onClick={() => handleSelectOption(option.label)}
                className={selectedValues.includes(option.label) ? 'selected' : ''}
              >
                <label>{option.label}</label>
                {selectedValues.includes(option.label) && 
                  <button onClick={() => handleSelectOption(option.label)} className='remove-button'>x</button>
                }
              </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultipleSelect;
