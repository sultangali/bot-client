import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchCreate = createAsyncThunk(
  "auth/fetchCreate",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/transaction", params);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
)

export const fetchDelete = createAsyncThunk(
  "auth/fetchDelete",
  async ({id}, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/transaction/${id}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPatch = createAsyncThunk(
    "transaction/fetchPatch",
    async ({ id, stock }, { rejectWithValue }) => {
      try {
        const response = await axios.patch(`/api/transaction/${id}`, { stock });
        return response.data;
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const fetchPay = createAsyncThunk(
    "transaction/fetchPay",
    async (params, { rejectWithValue }) => {
      try {
        const response = await axios.patch(`/api/transaction/pay`, params);
        return response.data;
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  );

export const fetchAll = createAsyncThunk(
  "auth/fetchAll",
  async () => {
    const { data } = await axios.get(`/api/transaction/all`);
    return data;
  }
)

const initialState = {
  items: [],
  data: null,
  status: 'idle',
  error: null,
  message: null
}

const slice = createSlice({
  name: "transaction",
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
        state.items = [];
      })
      .addCase(fetchCreate.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload
      })
      .addCase(fetchCreate.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      })

      .addCase(fetchPatch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPatch.fulfilled, (state, action) => {
        state.status = 'loaded';
        // Обновляем состояние с новой информацией о транзакции
        const updatedItemIndex = state.items.findIndex(item => item._id === action.payload._id);
        if (updatedItemIndex >= 0) {
          state.items[updatedItemIndex] = action.payload;
        }
      })
      .addCase(fetchPatch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchDelete.pending, (state, action) => {
        state.status = "loading";
        state.items = state.items.filter(
          (obj) => obj._id !== action.meta.arg
        );
      })
      .addCase(fetchDelete.rejected, (state, action) => {
        state.status = "error";
        state.items = action.payload;
      })
  }
});

export const transactionReducer = slice.reducer;
