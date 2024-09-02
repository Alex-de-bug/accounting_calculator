import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendFeedback = createAsyncThunk(
  "feedback/send",
  async ({ name, email, message }, thunkAPI) => {
    try {
      let link = "https://zhukov-finance.ru/api/feedback";
      const params = {
          name: name,
          email: email,
          message: message
      };
      const response = await axios.post(link, params, {
          headers: { "Content-Type": "application/json" }
      });
      let data = await response.data;
      if (response.status === 200) {
          return data;
      } else {
          return thunkAPI.rejectWithValue(data);
      }
  } catch (e) {
      return thunkAPI.rejectWithValue(e);
  }
  }
);

export const FeedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.errorMessage = "";
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendFeedback.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(sendFeedback.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(sendFeedback.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        console.log(payload)
        state.errorMessage = payload.code;
      });
  },
});

export const { clearState } = FeedbackSlice.actions;

export const feedbackSelector = (state) => state.feedback;

