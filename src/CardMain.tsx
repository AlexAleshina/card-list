import ImageCarousel from './ImageCarousel';
import './App.css';
import SelectorComponent from './Selector';
import { useCallback, useState } from 'react';
import './ImageCarousel.css';

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

      {item?.chipOptions?.map((option: any, i: number) => (
        <SelectorComponent key={i} data={option} onSelectionChange={handleSelectionChange} />
      ))}


      {!filteredModels?.length && !!item?.modelList[0] && (
        <img
          src={item?.modelList[0]?.thumbUrl}
          alt={item?.modelList[0]?.thumbUrlAlt}
          className="carousel-image"
        />
      )}

      {!!filteredModels && filteredModels?.map((model: any, i: number) => (
        <div key={model.modelCode + i}>
          <ImageCarousel data={model} selectedValues={selections}></ImageCarousel>
        </div>
      ))}
    </div>
  );
};

export default CardsList;
