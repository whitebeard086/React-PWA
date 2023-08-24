import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAssignVirtualAccount, apiGetCountries, apiUpdatePhone, apiVerifyPhone } from "@/services/AuthService";

export const getCountries = createAsyncThunk(
    "verify/data/getCountries",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiGetCountries(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updatePhone = createAsyncThunk(
    "verify/data/updatePhone",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiUpdatePhone(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const verifyPhone = createAsyncThunk(
    "verify/data/verifyPhone",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiVerifyPhone(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const assignVirtualAccount = createAsyncThunk(
    "verify/data/assignVirtualAccount",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiAssignVirtualAccount(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dataSlice = createSlice({
    name: 'verify/data',
    initialState: {
        countries: [],
        loading: false,
        phone: null,
        assigningAccount: false,
        settingPhone: false,
        verifying: false,
        resending: false,
        phoneStatus: 'idle',
        accountStatus: 'idle',
        message: '',
        verifyMessage: '',
        status: 'idle',
        timer: true,
    },
    reducers: {
        setPhone: (state, action) => {
            state.phone = action.payload
        },
        setPhoneStatus: (state, action) => {
            state.phoneStatus = action.payload
        },
        setMessage: (state, action) => {
            state.message = action.payload
        },
        resetStatus: (state) => {
            state.status = "idle";
        },
        setTimer: (state, action) => {
            state.timer = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCountries.pending, (state) => {
                state.loading = true
            })
            .addCase(getCountries.fulfilled, (state, action) => {
                state.loading = false
                state.countries = action.payload.countries
            })
            .addCase(getCountries.rejected, (state) => {
                state.loading = false
            })

            .addCase(updatePhone.pending, (state) => {
                state.settingPhone = true
                state.resending = true
            })
            .addCase(updatePhone.fulfilled, (state, action) => {
                state.settingPhone = false
                state.resending = false
                state.message = action.payload.message
            })
            .addCase(updatePhone.rejected, (state) => {
                state.settingPhone = false
                state.resending = false
                state.message = ''
            })

            .addCase(verifyPhone.pending, (state) => {
                state.verifying = true
            })
            .addCase(verifyPhone.fulfilled, (state, action) => {
                state.verifying = false
                state.status = action.payload.status;
                state.verifyMessage = action.payload.message
            })
            .addCase(verifyPhone.rejected, (state, action) => {
                state.verifying = false
                state.status = action.payload.status;
                state.verifyMessage = action.payload.message
            })

            .addCase(assignVirtualAccount.pending, (state) => {
                state.assigningAccount = true
            })
            .addCase(assignVirtualAccount.fulfilled, (state, action) => {
                state.assigningAccount = false
                state.accountStatus = action.payload.status
            })
            .addCase(assignVirtualAccount.rejected, (state) => {
                state.assigningAccount = false
            })
    }
})

export const {
    setPhone,
    setPhoneStatus,
    setMessage,
    resetStatus,
    setTimer,
} = dataSlice.actions;

export default dataSlice.reducer;