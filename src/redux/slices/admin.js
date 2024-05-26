import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios.js"

export const fetchCreate = createAsyncThunk(
  "auth/fetchCreate",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/admin/book", params)
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
)

export const fetchAll = createAsyncThunk(
  "auth/fetchAll",
  async () => {
    const { data } = await axios.get(`/api/admin/book/all`)
    return data;
  }
)

const initialState = {
  items: [],
  data: null,
  status: 'idle',
  error: null
}

const slice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
  },
  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchAll.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.items = action.payload;
      })
      .addCase(fetchAll.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      })

      .addCase(fetchCreate.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCreate.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchCreate.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
  }
});

export const adminReducer = slice.reducer;
