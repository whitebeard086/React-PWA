import { apiGetOperators } from "@/services/BillsService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getOperators = createAsyncThunk(
    "airtime/data/getOperators",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiGetOperators(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dataSlice = createSlice({
    name: 'airtime/data',
    initialState: {
        gettingOperators: false,
        operators: [],
        operatorStatus: 'idle',
        operatorMessage: '',
    },
    reducers: {
        setOperatorStatus: (state, action) => {
            state.operatorStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOperators.pending, (state) => {
                state.gettingOperators = true;
            })
            .addCase(getOperators.fulfilled, (state, action) => {
                state.gettingOperators = false;
                const { operators, status } = action.payload;
                state.operatorStatus = status;
                state.operators = operators?.data;
            })
            .addCase(getOperators.rejected, (state, action) => {
                state.gettingOperators = false;
                const { status, message } = action.payload;
                state.operatorMessage = message;
                state.operatorStatus = status || 'error';
                state.operators = [];
            })
    }
})

export const {
    setOperatorStatus,
} = dataSlice.actions;

export default dataSlice.reducer;