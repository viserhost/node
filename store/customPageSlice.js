import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ENDPOINTS from "@/lib/endpoints";

export const fetchCustomPages = createAsyncThunk(
    'fetchCustomPages',
    async () => {
        const baseUrl = process.env.baseUrl;
        const response = await fetch(baseUrl + ENDPOINTS.CUSTOM_PAGES);
        return response.json();
    }
);

const customPageSlice = createSlice({
    name: "customPage",
    initialState: {
        data: null,
        status: 'idle'
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomPages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCustomPages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCustomPages.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const { updateCustomPage } = customPageSlice.actions;

export default customPageSlice.reducer;


