import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiCreateCategory } from "services/HomeService";

export const createCategory = createAsyncThunk(
    "settings/data/createCategory",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiCreateCategory(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dataSlice = createSlice({
    name: 'settings/data',
    initialState: {
        creatingCategory: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCategory.pending, (state) => {
                state.creatingCategory = true
            })
            .addCase(createCategory.fulfilled, (state) => {
                state.creatingCategory = false
            })
            .addCase(createCategory.rejected, (state) => {
                state.creatingCategory = false
            })
    }
})

export default dataSlice.reducer