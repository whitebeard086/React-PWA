import { apiClearNotifications, apiCreateNotification, apiGetNotifications, apiReadAllNotifications, apiReadNotification } from "@/services/NotificationService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getNotifications = createAsyncThunk(
    "notifications/data/getNotifications",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiGetNotifications(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createNotification = createAsyncThunk(
    "notifications/data/createNotification",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiCreateNotification(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const readNotification = createAsyncThunk(
    "notifications/data/readNotification",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiReadNotification(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const readAllNotifications = createAsyncThunk(
    "notifications/data/readAllNotifications",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiReadAllNotifications(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const clearNotifications = createAsyncThunk(
    "notifications/data/clearNotifications",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiClearNotifications(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dataSlice = createSlice({
    name: 'notifications/data',
    initialState: {
        loading: false,
        creating: false,
        reading: false,
        readingAll: false,
        clearing: false,
        notifications: [],
        notification: {},
        status: 'idle',
        readStatus: 'idle',
        clearStatus: 'idle',
        createStatus: 'idle',
        readAllStatus: 'idle',
    },
    reducers: {
        setReadStatus: (state, action) => {
            state.readStatus = action.payload;
        },
        setClearStatus: (state, action) => {
            state.clearStatus = action.payload;
        },
        setCreateStatus: (state, action) => {
            state.createStatus = action.payload;
        },
        setReadAllStatus: (state, action) => {
            state.readAllStatus = action.payload;
        },
        setNotifications: (state, action) => {
            const exists = state.notifications.find((notification) => notification.id === action.payload.id)
            if (exists) {
                state.notifications = state.notifications.filter((notification) => notification.id !== action.payload.id)
            }

            state.notifications = [...state.notifications, action.payload]

            if (state.notifications.length > 1) {
                state.notifications.sort((a, b) => b.id - a.id);
            }
        },
        // updateNotifications: (state, action) => {
        //     const exists = state.notifications.find((notification) => notification.id === action.payload.id)
        //     state.notifications.filter((notification) => notification.id !== action.payload.id)

        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.pending, (state) => {
                state.loading = true;
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.loading = false;
                const { status, notifications } = action.payload;
                state.notifications = notifications;
                state.status = status
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.loading = false;
                const { status } = action.payload;
                state.status = status
            })

            .addCase(createNotification.pending, (state) => {
                state.creating = true;
            })
            .addCase(createNotification.fulfilled, (state, action) => {
                state.creating = false;
                const { status, notification } = action.payload;
                state.notification = notification;
                state.createStatus = status
            })
            .addCase(createNotification.rejected, (state, action) => {
                state.creating = false;
                const { status } = action.payload;
                state.createStatus = status
            })

            .addCase(readNotification.pending, (state) => {
                state.reading = true;
            })
            .addCase(readNotification.fulfilled, (state, action) => {
                state.reading = false;
                const { status, notification } = action.payload;
                state.notification = notification;
                state.readStatus = status
            })
            .addCase(readNotification.rejected, (state, action) => {
                state.reading = false;
                const { status } = action.payload;
                state.readStatus = status
            })

            .addCase(readAllNotifications.pending, (state) => {
                state.readingAll = true;
            })
            .addCase(readAllNotifications.fulfilled, (state, action) => {
                state.readingAll = false;
                const { status, notifications } = action.payload;
                state.notifications = notifications;
                state.readAllStatus = status
            })
            .addCase(readAllNotifications.rejected, (state, action) => {
                state.readingAll = false;
                const { status } = action.payload;
                state.readAllStatus = status
            })

            .addCase(clearNotifications.pending, (state) => {
                state.clearing = true;
            })
            .addCase(clearNotifications.fulfilled, (state, action) => {
                state.clearing = false;
                const { status } = action.payload;
                state.notifications = [];
                state.clearStatus = status
            })
            .addCase(clearNotifications.rejected, (state, action) => {
                state.clearing = false;
                const { status } = action.payload;
                state.clearStatus = status
            })
    }
});

export const {
    setReadStatus,
    setClearStatus,
    setCreateStatus,
    setReadAllStatus,
    setNotifications,
} = dataSlice.actions;

export default dataSlice.reducer;