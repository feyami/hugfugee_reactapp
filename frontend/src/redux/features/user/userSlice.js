import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
 

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/user/`;

const initialState = {
  user: null,
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "", 
};

export const getUsers = createAsyncThunk("user/getUsers", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const getUser = createAsyncThunk("user/getUser", async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
});

export const getUserWithCredentials = createAsyncThunk(
  "user/getUserWithCredentials",
  async (user, { rejectWithValue }) => {
   
    try {
      const response = await axios.get(`${API_URL}getUserWithCredentials/`, {
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


export const getUsersBySearch = createAsyncThunk(
    "user/getUsersBySearch",
    async (search) => {
        const response = await axios.get(`${API_URL}/getSpecific/getUsersBySearch?search=${search}`);
        return response.data;
    }
);


export const createUser = createAsyncThunk("user/createUser", async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
});

export const updateUser = createAsyncThunk("user/updateUser", async (formData) => {
  console.log("updateUser", formData);
  const response = await axios.patch(`${API_URL}${formData.id}`, formData );
  return response.data;
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
}
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    }
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.users = payload;
    },
    [getUsers.rejected]: (state, { error }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = error.message;
    },
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
    },
    [getUser.rejected]: (state, { error }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = error.message;
    },
    [getUserWithCredentials.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserWithCredentials.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
    },
    [getUserWithCredentials.rejected]: (state, { error }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = error.message;
    },
    [getUsersBySearch.pending]: (state) => {
        state.isLoading = true;
    },
    [getUsersBySearch.fulfilled]: (state, { payload }) => {
        state.isLoading = false;
        state.users = payload;
    },
    [getUsersBySearch.rejected]: (state, { error }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = error.message;
    },
    [createUser.pending]: (state) => {
      state.isLoading = true;
    },
    [createUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = payload.message;
      toast.success(payload.message);
    },
    [createUser.rejected]: (state, { error }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = error.message;
      toast.error(error.message);
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = payload.message;
      toast.success(payload.message);
    },
    [updateUser.rejected]: (state, { error }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = error.message;
      toast.error(error.message);
    },
    [deleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = payload.message;
      toast.success(payload.message);
    },
    [deleteUser.rejected]: (state, { error }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = error.message;
      toast.error(error.message);
    },
  },
});

export const { clearUserState } = userSlice.actions;


export default userSlice.reducer;


 

















