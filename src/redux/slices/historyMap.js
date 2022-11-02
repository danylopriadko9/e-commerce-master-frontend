import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchHistory = createAsyncThunk(
  'news/fetchHistory',
  async (url) => {
    if (url.length) {
      const { data } = await axios.get(`/history/${url}`);
      return data;
    }
  }
);

const initialState = {
  history: {
    category_name: null,
    category_url: null,
    parent_id: null,
    parent_name: null,
    parent_url: null,
  },
  status: null,
  error: null,
};

export const historyMapSlice = createSlice({
  name: 'history',
  initialState,
  extraReducers: {
    [fetchHistory.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchHistory.fulfilled]: (state, action) => {
      state.status = 'success';
      state.history = action.payload;
    },
    [fetchHistory.rejected]: (state, action) => {
      state.status = 'error';
    },
  },
});

export default historyMapSlice.reducer;
