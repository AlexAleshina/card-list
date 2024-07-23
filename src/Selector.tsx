import React, { useState, FC, useCallback, ChangeEvent } from 'react';

type Options = {
  fmyChipType: string;
  optionList: Option[];
}

type Option = {
  optionCode: string;
  optionName: string;
  optionLocalName: string;
  multiColorYN?: string;
  multiColorList?: string | null;
}
type SelectorProps = {
  options: Option[];
  selectedValue: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const ColorSelector: FC<SelectorProps> = ({ options, selectedValue, handleChange }) => (
  <div>
    <select id="colorSelector" value={selectedValue} onChange={handleChange}>
      {options.map((option) => (
        <option key={option.optionCode} value={option.optionCode} style={{ width: '30px', height: '30px', backgroundColor: selectedValue }}>
          {option.optionLocalName}
        </option>
      ))}
      {/* <div style={{ width: '30px', height: '30px', backgroundColor: selectedValue }}>
        {selectedValue}
      </div> */}
    </select>
  </div>
);

const TextSelector: FC<SelectorProps> = ({ options, selectedValue, handleChange }) => (
  <div>
    <select id="textSelector" value={selectedValue} onChange={handleChange}>
      {options.map((option) => (
        <option key={option.optionCode} value={option.optionCode}>
          {option.optionLocalName}
        </option>
      ))}
    </select>
  </div>
);

const SelectorComponent = ({ data, onSelectionChange }: { data: Options, onSelectionChange: any }) => {
  const { fmyChipType, optionList } = data;
  const [selectedValue, setSelectedValue] = useState(optionList[0].optionCode);

  const handleChange = useCallback((event: any) => {
    setSelectedValue(event.target.value);
    onSelectionChange(fmyChipType, event.target.value);
  }, [fmyChipType, onSelectionChange]);

  return (
    <div>
      {fmyChipType === 'COLOR' ? (
        <ColorSelector options={optionList} selectedValue={selectedValue} handleChange={handleChange} />
      ) : (
        <TextSelector options={optionList} selectedValue={selectedValue} handleChange={handleChange} />
      )}
    </div>
  );
};

export default SelectorComponent;
