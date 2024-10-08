import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchLoggedInUserOrders,
  fetchLoggedInUser,
  updateUser,
  storeImageInDatabase,
} from "../api/userAPI";

const initialState = {
  userOrders: [],
  status: "idle",
  userInfo: null, //This info will be used in case of detailed user info, while auth will only be used for loggedInUser id etc checks.
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "/users/fetchLoggedInUserOrders",
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    return response;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async (id) => {
    const response = await fetchLoggedInUser(id);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const updateUserAsync = createAsyncThunk(
  "/users/updateUser",
  async (update) => {
    const response = await updateUser(update);
    console.log(response);
    return response;
  }
);

export const saveImageAsync = createAsyncThunk(
  "/user/saveImage",
  async ({ downloadURL, userId }) => {
    const response = await storeImageInDatabase({ downloadURL, userId });
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(saveImageAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveImageAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = { ...state.userInfo, profilePicture: action.payload };
      })
      .addCase(saveImageAsync.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;
export default userSlice.reducer;
