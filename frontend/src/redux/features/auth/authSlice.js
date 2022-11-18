import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/auth/`;


const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

export const loginSuccess = createAsyncThunk(
  "auth/loginSuccess",
  async (user, { rejectWithValue }) => {
   
    try {
      const response = await axios.get(`${API_URL}login/success`, {
        withCredentials: true,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        }
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (user, { rejectWithValue }) => {
     
    try {
      const response = await axios.get(`${API_URL}logout`, {
        withCredentials: true,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        }
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  
  extraReducers: {
    [loginSuccess.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
       
      state.user = action.payload.user;
    },
    [loginSuccess.rejected]: (state, action) => {
      state.isAuthenticated = false;
      
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    [logout.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    }

  }
});

 

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
 

export default authSlice.reducer;



