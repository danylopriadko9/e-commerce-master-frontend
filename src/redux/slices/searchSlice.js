import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchSearchItems = createAsyncThunk(
  'search/fetchSearchItems',
  async ({ searchValue, groupUrl }) => {
    console.log(searchValue, groupUrl);
    if (groupUrl) {
      const { data } = await axios.get(`/search/${groupUrl}/${searchValue}`);
      return data;
    } else {
      const { data } = await axios.get(`/search/${searchValue}`);
      return data;
    }
  }
);

const initialState = {
  actualSearchItems: [],
  status: null,
  error: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  extraReducers: {
    [fetchSearchItems.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchSearchItems.fulfilled]: (state, action) => {
      state.actualSearchItems = action.payload;
      state.status = 'success';
    },
    [fetchSearchItems.rejected]: (state, action) => {
      state.status = 'error';
    },
  },
});

export default searchSlice.reducer;
