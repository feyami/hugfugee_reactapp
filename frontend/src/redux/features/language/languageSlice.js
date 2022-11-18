import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/language/`;

const initialState = {
    language: null,
    languages: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "", 
  };

export const fetchLanguages = createAsyncThunk(
    "language/fetchLanguages",
    async () => {
        const response = await axios.get(API_URL);
        return response.data;
        }
    );

export const fetchLanguage = createAsyncThunk(
    "language/fetchLanguage",
    async (id) => {
        const response = await axios.get(`${API_URL}${id}`);
        return response.data;
    }
);

export const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        addLanguage: (state, action) => {
            state.languages.push(action.payload);
        },
        updateLanguage: (state, action) => {
            const index = state.languages.findIndex(
                (language) => language._id === action.payload._id
            );
            state.languages[index] = action.payload;
        }
    },
    extraReducers: {
        [fetchLanguages.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchLanguages.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.languages = action.payload;
        },
        [fetchLanguages.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error.message;
        },
        [fetchLanguage.pending]: (state) => {
            state.isLoading = true;
        }   ,
        [fetchLanguage.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.language = action.payload;
        },
        [fetchLanguage.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error.message;
        }
    }
});

export const { addLanguage, updateLanguage } = languageSlice.actions;

export default languageSlice.reducer;






