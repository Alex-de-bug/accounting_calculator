import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk для получения начальных значений
export const calcConst = createAsyncThunk(
  "/calc",
  async (_, thunkAPI) => {
    try {
      let link = "http://localhost:8080/api/const";
      const response = await axios.get(link);
      let data = await response.data;
      if (response.status === 200) {
        console.log(data)
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response?.data || e.message);
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const updateCalcConst = createAsyncThunk(
    "calc/updateCalcConst",
    async (updatedData, thunkAPI) => {
      try {
        const state = thunkAPI.getState();
        const token = localStorage.getItem('token'); 
  
        if (!token) {
          throw new Error('Token is missing');
        }
  
        const response = await axios.post("http://localhost:8080/api/const", updatedData, {
          headers: {
            Authorization: `Bearer ${token}`  
          }
        });
  
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.response?.data || e.message);
      }
    }
  );
  
  
  

export const CalcSlice = createSlice({
  name: "calc",
  initialState: {
    ip: 1,
    ooo: 2.5,
    trading: 1,
    services: 1,
    building: 1.3,
    production: 1.5,
    catering: 1.2,
    otherOPF: 1,
    usnd: 1,
    usndr: 1.4,
    osn: 1.8,
    psnosn: 2.2,
    psnusnd: 1.5,
    psnusndr: 1.9,
    psnosnusndusndr: 1.2,
    isEmployerOpf: 2,
    additionalSettlement: 2000,
    kkt: 1500,
    ekvari: 1500,
    additionalPatent: 1500,
    agent: 1500,
    separateDivisions: 5000,
    FSRAR: 5000,
    VED: 5000,
    creditsLiz: 3000,
    countPersonals: 1000,
    GPH: 1250,
    foreignPers: 2000,
    decret: 1000,
    komandirovki: 2000,
    counterPP: 150,
    constGoodsAndService: 250,
    constRealizeGoodsAndService: 250,
    constSchetRealizeGoodsAndService: 500,
    constAvanse: 500,
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(calcConst.fulfilled, (state, { payload }) => {
        Object.keys(payload).forEach(key => {
          if (state.hasOwnProperty(key)) {
            state[key] = payload[key];
          }
        });
        state.isSuccess = true;
        state.isLoading = false;
        console.log("Константы обновлены:", state);
      })
      .addCase(calcConst.rejected, (state, { payload }) => {
        state.isError = true;
        state.isLoading = false;
        console.log("Ошибка:", payload);
      })
      .addCase(calcConst.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        console.log("Подгрузка значений");
      })
      .addCase(updateCalcConst.fulfilled, (state, { payload }) => {
        Object.keys(payload).forEach(key => {
          if (state.hasOwnProperty(key)) {
            state[key] = payload[key];
          }
        });
        state.isSuccess = true;
        state.isLoading = false;
        console.log("Константы успешно обновлены:", state);
      })
      .addCase(updateCalcConst.rejected, (state, { payload }) => {
        state.isError = true;
        state.isLoading = false;
        console.log("Ошибка при обновлении констант:", payload);
      })
      .addCase(updateCalcConst.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        console.log("Обновление значений");
      });
  }
});

export const { clearState } = CalcSlice.actions;

export const calcSelector = (state) => state.calc;
