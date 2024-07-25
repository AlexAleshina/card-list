import { useState, FC, useCallback, useEffect } from 'react';
import styled from 'styled-components';

const ColorOptions = styled.div`
    display: flex;
    gap: 10px;
`;

const ColorDot = styled.div<{ color: string; selected: boolean }>`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${props => props.color};
    border: 2px solid ${props => (props.selected ? '#000' : '#fff')};
    cursor: pointer;
    transition: border 0.3s ease-in-out;

    &:hover {
        border: 2px solid #000;
    }
`;

const SelectContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 8px;
`;

const ButtonOptions = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`;

const OptionButton = styled.button<{ selected: boolean }>`
    padding: 8px;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    background-color: ${props => (props.selected ? '#000' : '#ccc')};
    color: ${props => (props.selected ? '#fff' : '#000')};
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

    &:hover {
        border: 1px solid #000;
    }
    
`;

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
  handleChange: any;
}
const ColorSelector: FC<SelectorProps> = ({ options, selectedValue, handleChange }) => {
  const [selectedColor, setSelectedColor] = useState(selectedValue);

  const handleColorSelect = (color: string) => {
    if (color === selectedColor) return;
    setSelectedColor(color);
    const event = { target: { value: color } };
    handleChange(event);
  };
  return (
    <SelectContainer>
      <ColorOptions>
        {options.map((option) => (
          <ColorDot
            key={option.optionCode}
            color={option.optionCode}
            selected={option.optionCode === selectedColor}
            onClick={() => handleColorSelect(option.optionCode)}
          />
        ))}
      </ColorOptions>
    </SelectContainer>
  );
};

const TextSelector: FC<SelectorProps> = ({ options, selectedValue, handleChange }) => {
  const [selectedOption, setSelectedOption] = useState(selectedValue);

  const handleOptionSelect = ((value: string) => {
    if (value === selectedOption) return;
    setSelectedOption(value);
    const event = { target: { value } };
    handleChange(event);
  });
  return (
    <SelectContainer>
      <ButtonOptions>
        {options.map((option) => (
          <OptionButton
            key={option.optionCode}
            selected={option.optionCode === selectedOption}
            onClick={() => handleOptionSelect(option.optionCode)}
          >
            {option.optionLocalName}
          </OptionButton>
        ))}
      </ButtonOptions>
    </SelectContainer>
  )
};


const SelectorComponent = ({ data, onSelectionChange }: { data: Options, onSelectionChange: any }) => {
  const { fmyChipType, optionList } = data;
  const [selectedValue, setSelectedValue] = useState(optionList[0].optionCode);

  const handleChange = useCallback((event: any) => {
    setSelectedValue(event.target.value);
    onSelectionChange(fmyChipType, event.target.value);
  }, [fmyChipType, onSelectionChange]);

  useEffect(() => onSelectionChange(fmyChipType, optionList[0].optionCode), [fmyChipType, onSelectionChange, optionList]);

  return (
    <>
      {fmyChipType === 'COLOR' ? (
        <ColorSelector options={optionList} selectedValue={selectedValue} handleChange={handleChange} />
      ) : (
        <TextSelector options={optionList} selectedValue={selectedValue} handleChange={handleChange} />
      )}
    </>
  );
};

export default SelectorComponent;
