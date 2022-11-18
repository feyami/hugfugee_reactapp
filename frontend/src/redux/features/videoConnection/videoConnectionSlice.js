import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/videoConnection/`;

const initialState = {
    videoConnection: null,
    videoConnections: [],
    status: "idle",
    error: null,
};

export const fetchVideoConnections = createAsyncThunk(
    "videoConnections/fetchVideoConnections",
    async () => {
        const response = await axios.get(API_URL);
        return response.data;
    }
);

export const fetchVideoConnectionById = createAsyncThunk(
    "videoConnections/fetchVideoConnectionById",
    async (videoConnectionId) => {
        const response = await axios.get(`${API_URL}${videoConnectionId}`);
        return response.data;
    }
);

export const addNewVideoConnection = createAsyncThunk(
    "videoConnections/addNewVideoConnection",
    async (data) => {
        console.log("data", data);
        const response = await axios.post(API_URL, data);
        return response.data;
    }
);

export const updateVideoConnection = createAsyncThunk(
    "videoConnections/updateVideoConnection",
    async (videoConnection) => {
        const response = await axios.put(
            `${API_URL}${videoConnection._id}`,
            videoConnection
        );
        return response.data;
    }
);

export const deleteVideoConnection = createAsyncThunk(
    "videoConnections/deleteVideoConnection",
    async (videoConnectionId) => {
        await axios.delete(`${API_URL}${videoConnectionId}`);
        return videoConnectionId;
    }
);

const videoConnectionsSlice = createSlice({
    name: "videoConnections",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchVideoConnections.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchVideoConnections.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.videoConnections =  action.payload;
        },
        [fetchVideoConnections.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [fetchVideoConnectionById.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchVideoConnectionById.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.videoConnection = action.payload;
        },
        [fetchVideoConnectionById.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [addNewVideoConnection.pending]: (state, action) => {
            state.status = "loading";
        },
        [addNewVideoConnection.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.videoConnections.push(action.payload);
        },
        [addNewVideoConnection.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [updateVideoConnection.pending]: (state, action) => {
            state.status = "loading";
        },
        [updateVideoConnection.fulfilled]: (state, action) => {     
            state.status = "succeeded";
            const { _id, name } = action.payload;
            const existingVideoConnection = state.videoConnections.find((videoConnection) => videoConnection._id === _id);
            if (existingVideoConnection) {
                existingVideoConnection.name = name;
            }
        },
        [updateVideoConnection.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [deleteVideoConnection.pending]: (state, action) => {
            state.status = "loading";
        },
        [deleteVideoConnection.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.videoConnections = state.videoConnections.filter((videoConnection) => videoConnection._id !== action.payload);
        },
        [deleteVideoConnection.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    },
});

export default videoConnectionsSlice.reducer;


