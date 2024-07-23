import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface DataState {
  items: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DataState = {
  items: [],
  status: 'idle',
  error: null,
};
const apiUrl = process.env.REACT_APP_API_URL;

const API_URL = apiUrl || '';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  try {
    const response = await axios.get(API_URL);

    console.log({ response });
    return response.data?.response.resultData?.productList;
  } catch (error) {
    // TODO
    throw new Error('Some error occurred');
  }
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default dataSlice.reducer;