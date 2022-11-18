import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/chat/`;

const initialState = {
    chats: [],
    chat: null,
    notification: [],
    loading: false,
    error: null,
};

export const fetchChats = createAsyncThunk(
    "chat/fetchChats",
    async (user, { rejectWithValue }) => {
        try {
            
            const { data } = await axios.post(API_URL, user);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const accessChat = createAsyncThunk(
    "chat/accessChat",
    async (chatId, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${API_URL}/access/${chatId}`);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const createGroupChat = createAsyncThunk(
    "chat/createGroupChat",
    async (data, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${API_URL}/group`, data);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const removeFromGroup = createAsyncThunk(
    "chat/removeFromGroup",
    async (data, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${API_URL}/groupremove`, data);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const addToGroup = createAsyncThunk(
    "chat/addToGroup",
    async (data, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${API_URL}/groupadd`, data);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const renameGroup = createAsyncThunk(
    "chat/renameGroup",
    async (data, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${API_URL}/grouprename`, data);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setSelectedChat: (state, action) => {
            state.chat = action.payload;
        },
        clearChat: (state) => {
            state.chat = null;
        },
        clearNotification: (state) => {
            state.notification = [];
        },
        setNotification: (state, action) => {
            state.notification = action.payload;
        },
            
    },
    extraReducers: {
        [fetchChats.pending]: (state) => {
            state.loading = true;
        },
        [fetchChats.fulfilled]: (state, action) => {
            state.loading = false;
            state.chats = action.payload;
        },
        [fetchChats.rejected]: (state, action) => { 
            state.loading = false;
            state.error = action.payload;
        },
        [accessChat.pending]: (state) => {
            state.loading = true;
        },
        [accessChat.fulfilled]: (state, action) => {
            state.loading = false;
            state.selectedChat = action.payload;
        },
        [accessChat.rejected]: (state, action) => { 
            state.loading = false;
            state.error = action.payload;
        },
        [createGroupChat.pending]: (state) => {
            state.loading = true;
        },
        [createGroupChat.fulfilled]: (state, action) => {
            state.loading = false;
            state.chats = action.payload;
        },
        [createGroupChat.rejected]: (state, action) => { 
            state.loading = false;
            state.error = action.payload;
        },
        [removeFromGroup.pending]: (state) => {
            state.loading = true;
        },  
        [removeFromGroup.fulfilled]: (state, action) => {
            state.loading = false;
            state.chats = action.payload;
        },
        [removeFromGroup.rejected]: (state, action) => { 
            state.loading = false;
            state.error = action.payload;
        },
        [addToGroup.pending]: (state) => {
            state.loading = true;
        },
        [addToGroup.fulfilled]: (state, action) => {
            state.loading = false;
            state.chats = action.payload;
        },
        [addToGroup.rejected]: (state, action) => { 
            state.loading = false;
            state.error = action.payload;
        },
        [renameGroup.pending]: (state) => {
            state.loading = true;
        },
        [renameGroup.fulfilled]: (state, action) => {
            state.loading = false;
            state.chats = action.payload;
        },
        [renameGroup.rejected]: (state, action) => { 
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { setSelectedChat, clearChat, clearNotification,setNotification } = chatSlice.actions;

export const selectChats = (state) => state.chat.chats;
export const selectedChat = (state) => state.chat.chat;
export const selectNotification = (state) => state.chat.notification;
export const selectLoading = (state) => state.chat.loading;
export const selectError = (state) => state.chat.error;

export default chatSlice.reducer;




