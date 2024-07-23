import CardMain from './CardMain';
import './App.css';

const CardsList = ({ data }: { data: any }) => {
  return (
    <div className="card-list">
      {data.map((item: any) => (
        <CardMain item={item} key={item.familyId} />
      ))}
    </div>
  );
};

export default CardsList;
