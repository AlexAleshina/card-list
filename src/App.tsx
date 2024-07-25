import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchData } from './features/dataSlice';
import CardsList from './components/CardsList';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  // @ts-ignore
  const data = useAppSelector(state => state.data.items);
  // @ts-ignore
  const dataStatus = useAppSelector(state => state.data.status);
  // @ts-ignore
  const error = useAppSelector(state => state.data.error);

  useEffect(() => {
    if (dataStatus === 'idle') {
      dispatch(fetchData());
    }
  }, [dataStatus, dispatch]);

  let content;

  if (dataStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (dataStatus === 'succeeded') {
    content = (
      <CardsList data={data} />
    );
  } else if (dataStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div className="App">
      <h1>Products List</h1>
      {content}
    </div>
  );
};

export default App;