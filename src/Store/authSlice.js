import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

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

//action for check if the user has email or not
export const userHasEmail = createAsyncThunk(
  "auth/resetPasswordMail",
  async (userEmailwithOtp, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://volt-nation.up.railway.app/user/reset-password-mail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userEmailwithOtp),
        }
      );

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//action for update user's password
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://volt-nation.up.railway.app/user/update-password",
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
    isAdmin: false,
    isLoggedIn: false,
    isRegistered: false,
    registrationError: null,
    logInError: null,
    doesUserHasEmail: false,
    doesUserUpdatedPassword: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      return {
        isLoggedIn: false,
        isAdmin: false,
        isRegistered: false,
        registrationError: null,
        logInError: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload.res) {
        state.isRegistered = true;
      } else {
        state.registrationError = action.payload.message;
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.registrationError = action.payload;
    });

    // Extra reducers for logInUser asyncthunk

    builder.addCase(logInUser.fulfilled, (state, action) => {
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);

        const decodedToken = jwtDecode(action.payload.token);
        if (decodedToken.isAdmin === "admin") {
          state.isAdmin = true;
        }
        state.isLoggedIn = true;
      } else {
        state.logInError = action.payload.message;
      }
    });
    builder.addCase(logInUser.rejected, (state, action) => {
      state.isLoggingIn = false;
      state.logInError = action.payload;
    });

    // Extra reducers for UserHasEmail asyncthunk
    builder.addCase(userHasEmail.pending, (state) => {
      state.doesUserHasEmail = null;
    });
    builder.addCase(userHasEmail.fulfilled, (state) => {
      // state.doesUserHasEmail = true;
    });
    builder.addCase(userHasEmail.rejected, (state) => {
      state.doesUserHasEmail = false;
    });

    // Extra reducers for update password asyncthunk
    builder.addCase(updatePassword.pending, (state) => {
      state.isLoggingIn = true;
      state.logInError = null;
    });
    builder.addCase(updatePassword.fulfilled, (state) => {
      state.doesUserUpdatedPassword = true;
    });
    builder.addCase(updatePassword.rejected, (state) => {
      state.doesUserUpdatedPassword = false;
    });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
