import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isAuthenticated: false,
    userPreferences: {
      enableDarkMode: false
    }
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    changeThemeMode: (state) => {
      state.userPreferences.enableDarkMode = !state.userPreferences.enableDarkMode;
    }
  }
});

export const { setCurrentUser, setIsAuthenticated, changeThemeMode } = userSlice.actions;
export const userReducers = userSlice.reducer;
