import { configureStore } from "@reduxjs/toolkit";
import { LoginSlice } from "./slices/LoginSlice.jsx";
import { SignupSlice } from "./slices/SignUpSlice.jsx";
import {HomeSlice} from "./slices/HomeSlice.jsx";
import {EditSlice} from "./slices/EditSlice.jsx";
import { CalcSlice } from "./slices/CalcSlice.jsx";
import { FeedbackSlice } from "./slices/FeedbackSlice.jsx";

const store = configureStore({
    reducer: {
        login: LoginSlice.reducer,
        signup: SignupSlice.reducer,
        edit: EditSlice.reducer,
        home: HomeSlice.reducer,
        calc: CalcSlice.reducer,
        feedback: FeedbackSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        })
});

export default store;
