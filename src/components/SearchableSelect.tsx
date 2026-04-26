import React, { useState, useEffect, useRef } from 'react';

interface SearchableSelectProps {
  options: string[];
  value: string | undefined;
  onChange: (value: string) => void;
  id?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  className = "",
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>(value || "");
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    onChange(val);
    
    // Filter options based on input
    const filtered = options.filter(option => 
      option.toLowerCase().includes(val.toLowerCase())
    );
    setFilteredOptions(filtered);
    setShowOptions(true);
  };

  // Handle option selection
  const handleOptionClick = (option: string) => {
    setInputValue(option);
    onChange(option);
    setShowOptions(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowOptions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update filtered options when parent options change
  useEffect(() => {
    setFilteredOptions(options);
    // Reset input value if options change and current value is not in new options
    if (value && !options.includes(value)) {
      setInputValue("");
      onChange("");
    }
  }, [options]);

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowOptions(true)}
        className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
      
      {showOptions && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60">
          {filteredOptions.map((option, index) => (
            <li 
              key={index} 
              onClick={() => handleOptionClick(option)}
              className="px-3 py-2 cursor-pointer hover:bg-blue-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableSelect;