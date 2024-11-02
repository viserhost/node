const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
    name: "userData",
    initialState: {
        data: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        setUserData: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;