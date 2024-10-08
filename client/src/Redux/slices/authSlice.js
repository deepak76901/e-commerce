import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, logOut, auto_Login } from "../api/authAPI";
import { updateUser } from "../api/userAPI";

const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (logInInfo, { rejectWithValue }) => {
    try {
      const response = await checkUser(logInInfo);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const auto_Login_Async = createAsyncThunk(
  "user/autoLogin",
  async () => {
    try {
      console.log("Slice triggered");
      const response = await auto_Login();
      return response;
    } catch (error) {
      console.log(error);
      // return rejectWithValue(error);
    }
  }
);

export const logOutAsync = createAsyncThunk(
  "user/logOut",
  async (logInInfo) => {
    const response = await logOut(logInInfo);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload.rest;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(auto_Login_Async.pending, (state) => {
        state.status = "loading";
      })
      .addCase(auto_Login_Async.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload.rest;
      })
      .addCase(auto_Login_Async.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(logOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      });
  },
});

export const { increment } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
