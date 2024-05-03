import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://volt-nation.up.railway.app/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logInUser = createAsyncThunk(
  "auth/logInUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://volt-nation.up.railway.app/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isLoggingIn: false,
    isRegistered: false,
    isRegistering: false,
    registrationError: null,
    logInError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isRegistering = true;
      state.registrationError = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload.res) {
        state.isRegistering = false;
        state.isRegistered = true;
      } else {
        state.registrationError = action.payload.message;
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isRegistering = false;
      state.registrationError = action.payload;
    });

    // Extra reducers for logInUser asyncthunk
    builder.addCase(logInUser.pending, (state) => {
      state.isLoggingIn = true;
      state.logInError = null;
    });
    builder.addCase(logInUser.fulfilled, (state, action) => {
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
        state.isLoggingIn = false;
        state.isLoggedIn = true;
      } else {
        state.logInError = action.payload.message;
      }
    });
    builder.addCase(logInUser.rejected, (state, action) => {
      state.isLoggingIn = false;
      state.logInError = action.payload;
    });
  },
});

export default authSlice.reducer;
