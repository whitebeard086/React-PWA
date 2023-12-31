import { apiPaymentsData, apiPaystackDeposit, apiUpdateTransaction, apiVerifyPaystackDeposit } from "@/services/PaymentService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const paystackDeposit = createAsyncThunk(
    "payments/data/paystackDeposit",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiPaystackDeposit(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const verifyPaystackDeposit = createAsyncThunk(
    "payments/data/verifyPaystackDeposit",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiVerifyPaystackDeposit(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const paymentsData = createAsyncThunk(
    "payments/data/paymentsData",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiPaymentsData(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateTransaction = createAsyncThunk(
    "payments/data/updateTransaction",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiUpdateTransaction(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dataSlice = createSlice({
    name: 'payments/data',
    initialState: {
        depositing: false,
        verifying: false,
        receivedDeposit: false,
        transactions: [],
        depositDetails: {},
        status: 'idle',
        updateStatus: 'idle',
        depositStatus: 'idle',
    },
    reducers: {
        setUpdateStatus: (state, action) => {
            state.updateStatus = action.payload
        },
        setReceivedDeposit: (state, action) => {
            state.receivedDeposit = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(paystackDeposit.pending, (state) => {
                state.depositing = true;
            })
            .addCase(paystackDeposit.fulfilled, (state, action) => {
                state.depositing = false;
                state.depositStatus = action.payload.status;
            })
            .addCase(paystackDeposit.rejected, (state) => {
                state.depositing = false;
            })

            .addCase(verifyPaystackDeposit.pending, (state) => {
                state.verifying = true;
            })
            .addCase(verifyPaystackDeposit.fulfilled, (state, action) => {
                state.verifying = false;
                state.depositDetails = action.payload;
            })
            .addCase(verifyPaystackDeposit.rejected, (state) => {
                state.verifying = false;
            })

            .addCase(paymentsData.pending, (state) => {
                state.verifying = true;
            })
            .addCase(paymentsData.fulfilled, (state, action) => {
                state.verifying = false;
                state.transactions = action.payload.transactions;
                state.status = action.payload.status;
            })
            .addCase(paymentsData.rejected, (state) => {
                state.verifying = false;
                state.status = 'error';
            })

            .addCase(updateTransaction.fulfilled, (state, action) => {
                state.updateStatus = action.payload.status;
            })
            .addCase(updateTransaction.rejected, (state) => {
                state.updateStatus = 'error';
            })
    }
})

export const {
    setUpdateStatus,
    setReceivedDeposit,
} = dataSlice.actions;

export default dataSlice.reducer;