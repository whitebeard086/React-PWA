import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetProvider } from "services/AuthService";
import { apiDeleteMessage, apiInitiateChat, apiSendMessage } from "services/ChatService";

export const initiateChat = createAsyncThunk(
    "chat/data/initiateChat",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiInitiateChat(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const sendMessage = createAsyncThunk(
    "chat/data/sendMessage",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiSendMessage(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const deleteMessage = createAsyncThunk(
    "chat/data/deleteMessage",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiDeleteMessage(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dataSlice = createSlice({
    name: 'chat/data',
    initialState: {
        gettingProvider: false,
        provider: {},
        chat: {},
        messages: [],
        sendingMessage: false,
        message: {},
        messageStatus: 'idle',
        deleteMessageStatus: 'idle',
    },
    reducers: {
        setMessageStatus: (state, action) => {
            state.messageStatus = action.payload
        },
        removeMessage: (state, action) => {
            state.messages.filter((message) => message.id === action.payload)
        },
        setDeleteMessageStatus: (state, action) => {
            state.deleteMessageStatus = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initiateChat.pending, (state) => {
                state.gettingProvider = true
            })
            .addCase(initiateChat.fulfilled, (state, action) => {
                state.gettingProvider = false
                state.provider = action.payload.provider
                state.chat = action.payload.chat
                state.messages = action.payload.chat.messages ? action.payload.chat.messages : []
            })
            .addCase(initiateChat.rejected, (state) => {
                state.gettingProvider = false
            })

            .addCase(sendMessage.pending, (state) => {
                state.sendingMessage = true
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.sendingMessage = false
                state.messages = [...state.messages, action.payload.message]
                state.messageStatus = action.payload.status
            })
            .addCase(sendMessage.rejected, (state) => {
                state.sendingMessage = false
                state.messageStatus = 'error'
            })

            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.messages = state.messages.filter((message) => message.id !== Number(action.payload.message))
                state.deleteMessageStatus = 'success'
            })
            .addCase(deleteMessage.rejected, (state) => {
                state.deleteMessageStatus = 'error'
            })
    }
})

export const {
    setMessageStatus,
    removeMessage,
    setDeleteMessageStatus
} = dataSlice.actions

export default dataSlice.reducer