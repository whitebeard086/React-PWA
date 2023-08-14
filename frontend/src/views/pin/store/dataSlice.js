import { apiCreatePin } from "@/services/AuthService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createPin = createAsyncThunk(
    "profile/data/createPin",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiCreatePin(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dataSlice = createSlice({
    name: 'pin/data',
    initialState: {
        loading: false,
        status: 'idle',
        message: '',
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPin.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPin.fulfilled, (state, action) => {
                state.loading = false;
                const { status } = action.payload;
                state.status = status
            })
            .addCase(createPin.rejected, (state, action) => {
                state.loading = false;
                const { status, message } = action.payload;
                state.status = status
                state.message = message
            })
    }
})

export const {
    setStatus,
} = dataSlice.actions;

export default dataSlice.reducer;