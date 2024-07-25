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
    content = <p style={{ 'color': '#9e9e9e', 'fontWeight': 'bold' }}>Loading...</p>;
  } else if (dataStatus === 'succeeded') {
    content = (
      <CardsList data={data} />
    );
  } else if (dataStatus === 'failed') {
    content = <p style={{ 'color': 'red', 'fontWeight': 'bold' }}> {error}</p >;
  }

  return (
    <div className="App">
      <h1 style={{ 'color': '#e3e3e3', 'textAlign': 'center' }}>Products List</h1>
      {content}
    </div>
  );
};

export default App;