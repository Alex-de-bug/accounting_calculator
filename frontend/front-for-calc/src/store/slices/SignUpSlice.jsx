import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
    "users/signupUser",
    async ({ name, key, password }, thunkAPI) => {
        try {
            let link = "https://zhukov-finance.ru/api/register";
            const params = {
                key: key,
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

export const SignupSlice = createSlice({
    name: "signup",
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
            .addCase(signupUser.fulfilled, (state, { payload }) => {
                state.token = payload.token;
                state.isFetching = false;
                state.isSuccess = true;
                state.errorMessage = "";
                return state;
            })
            .addCase(signupUser.rejected, (state, { payload }) => {
                state.isFetching = false;
                state.isError = true;
                try{
                    state.errorMessage = payload.response.data
                    
                }catch{
                    state.errorMessage = "Something went wrong. " + payload
                }
                
            })
            .addCase(signupUser.pending, (state) => {
                state.isFetching = true;
            })
    }
});

export const { clearState } = SignupSlice.actions;

export const signupSelector = (state) => state.signup;
