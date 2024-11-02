import { configureStore } from "@reduxjs/toolkit";
import gsReducer from './gsSlice';
import captchaReducer from './captchaSlice';
import languageReducer from './langSlice';
import userSlice from './userSlice';
import customPageReducer from './customPageSlice';

export const store = configureStore({
    reducer: {
        gs: gsReducer,
        captcha: captchaReducer,
        language: languageReducer,
        user: userSlice,
        customPage: customPageReducer
    }
});