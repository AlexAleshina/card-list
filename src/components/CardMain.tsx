import ImageCarousel from './ImageCarousel';
import './App.css';
import SelectorComponent from './Selectors';
import { useCallback, useState } from 'react';
import './ImageCarousel.css';
import styled from 'styled-components';
import ModelDetailsContainer from './ModelDetailsContainer';

const SelectorsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 8px;
    justify-content: space-between;
`;

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;


const filterModels = (modelList: any, selections: any) => {
  return modelList.filter((model: any) =>
    model.fmyChipList.every((chip: any) =>
      selections[chip.fmyChipType] === chip.fmyChipCode
    )
  );
};

const CardsList = ({ item }: { item: any }) => {
  const [selections, setSelections] = useState({});

  const filteredModels = filterModels(item?.modelList, selections);
  console.log('filteredModels:', filteredModels);

  const handleSelectionChange = useCallback((name: string, selectedValue: string) => {
    setSelections(prevSelections => ({
      ...prevSelections,
      [name]: selectedValue
    }));
  }, []);

  console.log('selections:', selections);
  return (
    <div className="card">
      <h3>{item.fmyMarketingName}</h3>

      <SelectorsWrapper>
        {item?.chipOptions?.map((option: any, i: number) => (
          <SelectorComponent key={i} data={option} onSelectionChange={handleSelectionChange} />
        ))}
      </SelectorsWrapper>

      {!filteredModels?.length && !!item?.modelList[0] && (
        <img
          src={item?.modelList[0]?.thumbUrl}
          alt={item?.modelList[0]?.thumbUrlAlt}
          className="carousel-image"
        />
      )}

      {!!filteredModels && filteredModels?.map((model: any, i: number) => (
        <DetailsContainer key={model.modelCode + i}>
          <ImageCarousel data={model}></ImageCarousel>
          <ModelDetailsContainer data={model}></ModelDetailsContainer>
        </DetailsContainer>
      ))}
    </div>
  );
};

export default CardsList;
