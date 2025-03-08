import { createSlice } from '@reduxjs/toolkit';

export interface ICurrentUser {
  id: string;
  username: string;
  email: string;
}

export interface IUserSliceInitialState {
  currentUser: null | ICurrentUser;
  isAuthenticated: boolean;
  userPreferences: {
    enableDarkMode: boolean;
  };
}

export const userSliceInitialState: IUserSliceInitialState = {
  currentUser: null,
  isAuthenticated: false,
  userPreferences: {
    enableDarkMode: false
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: userSliceInitialState,
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
