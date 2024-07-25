import ImageCarousel from './ImageCarousel';
import SelectorComponent from './Selectors';
import { useCallback, useState } from 'react';
import ModelDetailsContainer from './DetailsContainer';
import styled from 'styled-components';
import { CardImage } from './styled';

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    padding: 24px;
    border: 1px solid #f7f7f7;
    background-color: #f7f7f7;
    width: 350px;
    height: 100%;
`;

const SelectorsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 8px;
    justify-content: space-between;
    width: 100%;
`;

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    height: 100%;
`;

const MainCardTitle = styled.h3`
    color: #333;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
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
  const handleSelectionChange = useCallback((name: string, selectedValue: string) => {
    setSelections(prevSelections => ({
      ...prevSelections,
      [name]: selectedValue
    }));
  }, []);

  return (
    <Card>
      <MainCardTitle>{item?.fmyMarketingName || 'Name'}</MainCardTitle>

      <SelectorsWrapper>
        {item?.chipOptions?.map((option: any, i: number) => (
          <SelectorComponent key={i} data={option} onSelectionChange={handleSelectionChange} />
        ))}
      </SelectorsWrapper>

      {!filteredModels?.length && !!item?.modelList[0] && (
        <CardImage
          src={item?.modelList[0]?.thumbUrl}
          alt={item?.modelList[0]?.thumbUrlAlt}
        />
      )}

      {!!filteredModels && filteredModels?.map((model: any, i: number) => (
        <DetailsContainer key={model.modelCode + i}>
          <ImageCarousel data={model}></ImageCarousel>
          <ModelDetailsContainer data={model}></ModelDetailsContainer>
        </DetailsContainer>
      ))}
    </Card>
  );
};

export default CardsList;
