import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/message`;

const initialState = {
    messages: [],
    message: null,
    loading: false,
    error: null,
};

export const fetchMessages = createAsyncThunk(
    "message/fetchMessages",
    async (chatId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${API_URL}/${chatId}`);
            console.log("fetchMessages data: ", data);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


export const sendMessage = createAsyncThunk(
    "message/sendMessage",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/send`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = null;
        }
    },
    extraReducers: {
        [fetchMessages.pending]: (state) => {
            state.loading = true;
        },
        [fetchMessages.fulfilled]: (state, action) => {
            state.loading = false;
            state.messages = action.payload;
        },
        [fetchMessages.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [sendMessage.pending]: (state) => {
            state.loading = true;
        },
        [sendMessage.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [sendMessage.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { clearMessage } = messageSlice.actions;

export default messageSlice.reducer;




