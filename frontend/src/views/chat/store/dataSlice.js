import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiBookService } from "services/BookingService";
import { apiDeleteMessage, apiInitiateChat, apiMakeInvoice, apiSendMessage, apiSendNewMessageEmail } from "services/ChatService";

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
export const makeInvoice = createAsyncThunk(
    "chat/data/makeInvoice",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiMakeInvoice(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const sendNewMessageEmail = createAsyncThunk(
    "chat/data/sendNewMessageEmail",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiSendNewMessageEmail(data);
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

export const bookService = createAsyncThunk(
    "chat/data/bookService",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiBookService(data);
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
        makingInvoice: false,
        bookingService: false,
        serviceBooked: false,
        receivedInvoice: false,
        booked: false,
        booking: {},
        sentMessage: {},
        invoice: {},
        invoices: [],
        escrow: {},
        messageStatus: 'idle',
        invoiceStatus: 'idle',
        bookingStatus: 'idle',
        bookingMessage: '',
        deleteMessageStatus: 'idle',
    },
    reducers: {
        setMessageStatus: (state, action) => {
            state.messageStatus = action.payload
        },
        setInvoiceStatus: (state, action) => {
            state.invoiceStatus = action.payload
        },
        removeMessage: (state, action) => {
            state.messages.filter((message) => message.id === action.payload)
        },
        resetBookingStatus: (state) => {
            state.bookingStatus = 'idle'
            state.bookingMessage = ''
        },
        setBookedStatus: (state, action) => {
            state.booked = action.payload
        },
        setServiceBooked: (state, action) => {
            state.serviceBooked = action.payload
        },
        setReceivedInvoice: (state, action) => {
            state.receivedInvoice = action.payload
        },
        setDeleteMessageStatus: (state, action) => {
            state.deleteMessageStatus = action.payload
        },
        setMessages: (state, action) => {
            state.messages = [...state.messages, action.payload]
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initiateChat.pending, (state) => {
                state.gettingProvider = true
            })
            .addCase(initiateChat.fulfilled, (state, action) => {
                state.gettingProvider = false
                const { provider, chat } = action.payload
                state.invoices = chat.invoices
                state.provider = provider
                state.chat = chat
                state.messages = chat.messages ? chat.messages : []
                state.invoice = state.invoices?.filter((invoice) => invoice.status === 'pending')[0] || {}

                const isBooked = state.invoices?.some((invoice) => invoice.status === 'paid')

                if (isBooked) {
                    if (state.booked === false) {
                        state.booked = true
                    }
                } else {
                    if (state.booked === true) {
                        state.booked = false
                    }
                }
            })
            .addCase(initiateChat.rejected, (state) => {
                state.gettingProvider = false
            })

            .addCase(sendMessage.pending, (state) => {
                state.sendingMessage = true
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.sendingMessage = false
                state.messageStatus = action.payload.status
                state.sentMessage = action.payload.message
            })
            .addCase(sendMessage.rejected, (state) => {
                state.sendingMessage = false
                state.messageStatus = 'error'
            })

            .addCase(makeInvoice.pending, (state) => {
                state.makingInvoice = true
            })
            .addCase(makeInvoice.fulfilled, (state, action) => {
                state.makingInvoice = false
                const { status, invoice } = action.payload
                state.invoice = invoice
                state.invoiceStatus = status
            })
            .addCase(makeInvoice.rejected, (state, action) => {
                state.makingInvoice = false
                state.invoiceStatus = 'error'
            })

            .addCase(bookService.pending, (state) => {
                state.bookingService = true
            })
            .addCase(bookService.fulfilled, (state, action) => {
                state.bookingService = false
                const { status, booking, escrow } = action.payload
                state.bookingStatus = status
                state.booking = booking
                state.escrow = escrow
            })
            .addCase(bookService.rejected, (state, action) => {
                state.bookingService = false
                const { status, message } = action.payload
                state.bookingStatus = status
                state.bookingMessage = message
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
    setInvoiceStatus,
    removeMessage,
    setMessages,
    setServiceBooked,
    setReceivedInvoice,
    setBookedStatus,
    resetBookingStatus,
    setDeleteMessageStatus
} = dataSlice.actions

export default dataSlice.reducer