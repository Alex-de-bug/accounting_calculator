import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editConst = createAsyncThunk(
    "/edit",
    async ({ name, password }, thunkAPI) => {
        try {
            let link = "http://localhost:8080/api/auth/authenticate";
            const params = {
                name: name,
                password: password
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

export const EditSlice = createSlice({
    name: "edit",
    initialState: {
        token: "",
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: ""
    },
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(editConst.fulfilled, (state, { payload }) => {
                state.token = payload.token;
                state.isFetching = false;
                state.isSuccess = true;
                state.errorMessage = "";
                return state;
            })
            .addCase(editConst.rejected, (state, { payload }) => {
                state.isFetching = false;
                state.isError = true;
                try{
                    state.errorMessage = payload.response.data
                    
                }catch{
                    state.errorMessage = "Something went wrong. " + payload
                }
            })
            .addCase(editConst.pending, (state) => {
                state.isFetching = true;
            })
    }
});

export const { clearState } = EditSlice.actions;

export const editSelector = (state) => state.edit;