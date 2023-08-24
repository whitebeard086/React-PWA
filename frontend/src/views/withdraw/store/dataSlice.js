import {
    apiAddAccount,
    apiCreateTransferRecipient,
    apiGetWithdrawalData,
    apiPayoutCustomer,
    apiRemoveAccount,
    apiResolveAccountNumber,
} from "@/services/WithdrawalService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getWithdrawalData = createAsyncThunk(
    "payments/data/getWithdrawalData",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiGetWithdrawalData(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const resolveAccountNumber = createAsyncThunk(
    "payments/data/resolveAccountNumber",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiResolveAccountNumber(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createTransferRecipient = createAsyncThunk(
    "payments/data/createTransferRecipient",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiCreateTransferRecipient(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addAccount = createAsyncThunk(
    "payments/data/addAccount",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiAddAccount(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const removeAccount = createAsyncThunk(
    "payments/data/removeAccount",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiRemoveAccount(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const payoutCustomer = createAsyncThunk(
    "payments/data/payoutCustomer",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiPayoutCustomer(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dataSlice = createSlice({
    name: "withdraw/data",
    initialState: {
        loading: false,
        deleting: false,
        addingAccount: false,
        resolvingAccount: false,
        creatingRecipient: false,
        accounts: [],
        account: {},
        recipient: {},
        resolvedAccount: {},
        banks: [],
        status: "idle",
        deleteStatus: "idle",
        accountStatus: "idle",
        resolveStatus: "idle",
        recipientStatus: "idle",
        deleteError: "",
        errorMessage: "",
        accountError: "",
        resolveError: "",
        recipientError: "",
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setAccount: (state, action) => {
            state.account = action.payload;
        },
        setDeleteStatus: (state, action) => {
            state.deleteStatus = action.payload;
        },
        setAccountStatus: (state, action) => {
            state.accountStatus = action.payload;
        },
        setResolveStatus: (state, action) => {
            state.resolveStatus = action.payload;
        },
        setRecipientError: (state, action) => {
            state.recipientError = action.payload;
        },
        setRecipientStatus: (state, action) => {
            state.recipientStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWithdrawalData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getWithdrawalData.fulfilled, (state, action) => {
                state.loading = false;
                const { banks, status } = action.payload;
                state.status = status;
                state.banks = banks?.response?.data;
            })
            .addCase(getWithdrawalData.rejected, (state, action) => {
                state.loading = false;
                const { status, message } = action.payload;
                state.status = status;
                state.errorMessage = message;
            })

            .addCase(resolveAccountNumber.pending, (state) => {
                state.resolvingAccount = true;
            })
            .addCase(resolveAccountNumber.fulfilled, (state, action) => {
                state.resolvingAccount = false;
                const { response, status } = action.payload;
                state.resolvedAccount = response.data;
                state.resolveStatus = status;

                if (state.resolveError !== "") {
                    state.resolveError = "";
                }
            })
            .addCase(resolveAccountNumber.rejected, (state, action) => {
                state.resolvingAccount = false;
                const { message, status } = action.payload;
                state.resolveError = message;
                state.resolveStatus = status;

                if (state.resolvedAccount !== {}) {
                    state.resolvedAccount = {};
                }
            })

            .addCase(createTransferRecipient.pending, (state) => {
                state.creatingRecipient = true;
            })
            .addCase(createTransferRecipient.fulfilled, (state, action) => {
                state.creatingRecipient = false;
                const { status, response } = action.payload;
                state.recipient = response.data;
                state.recipientStatus = status;

                if (state.recipientError !== "") {
                    state.recipientError = "";
                }
            })
            .addCase(createTransferRecipient.rejected, (state, action) => {
                state.creatingRecipient = false;
                const { status, message } = action.payload;
                state.recipientStatus = status;
                state.recipientError = message;

                if (state.recipient !== {}) {
                    state.recipient = {};
                }
            })

            .addCase(addAccount.pending, (state) => {
                state.addingAccount = true;
            })
            .addCase(addAccount.fulfilled, (state, action) => {
                state.addingAccount = false;
                const { status, account } = action.payload;
                state.account = account;
                state.accountStatus = status;

                if (state.accountError !== "") {
                    state.accountError = "";
                }

                if (state.resolvedAccount !== {}) {
                    state.resolvedAccount = {};
                    state.resolveStatus = "idle";
                }
            })
            .addCase(addAccount.rejected, (state, action) => {
                state.addingAccount = false;
                const { status, message } = action.payload;
                state.accountStatus = status;
                state.accountError = message;

                if (state.account !== {}) {
                    state.account = {};
                }
            })

            .addCase(removeAccount.pending, (state) => {
                state.deleting = true;
            })
            .addCase(removeAccount.fulfilled, (state, action) => {
                state.deleting = false;
                const { status } = action.payload;
                state.deleteStatus = status;

                if (state.deleteError !== "") {
                    state.deleteError = "";
                }
            })
            .addCase(removeAccount.rejected, (state, action) => {
                state.deleting = false;
                const { status, message } = action.payload;
                state.deleteStatus = status;
                state.deleteError = message;
            });
    },
});

export const {
    setStatus,
    setAccount,
    setDeleteStatus,
    setAccountStatus,
    setResolveStatus,
    setRecipientError,
    setRecipientStatus,
} = dataSlice.actions;

export default dataSlice.reducer;
