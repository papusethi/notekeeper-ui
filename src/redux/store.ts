import { configureStore } from '@reduxjs/toolkit';
import { folderNoteReducers } from './folder-note-slice/FolderNoteSlice';
import { userReducers } from './user-slice/userSlice';

// Create the store
const store = configureStore({
  reducer: {
    user: userReducers,
    folderNote: folderNoteReducers
  }
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
