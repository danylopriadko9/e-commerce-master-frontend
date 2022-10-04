import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const { data } = await axios.get('/news');
  return data;
});

const initialState = {
  news: [],
  newsStatus: null,
  error: null,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  extraReducers: {
    [fetchNews.pending]: (state, action) => {
      state.newsStatus = 'loading';
      state.error = null;
    },
    [fetchNews.fulfilled]: (state, action) => {
      state.newsStatus = 'success';
      state.news = action.payload;
    },
    [fetchNews.rejected]: (state, action) => {
      state.newsStatus = 'error';
    },
  },
});

export default newsSlice.reducer;
