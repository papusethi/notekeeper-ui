import { createSlice } from '@reduxjs/toolkit';

const folderNoteSlice = createSlice({
  name: 'folderNote',
  initialState: {
    notes: [],
    folders: [],
    foldersMapping: null,
    currentNote: null,
    sideNav: {
      activeSection: 'home',
      activeFolderId: null
    }
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setFolders: (state, action) => {
      state.folders = action.payload;
      state.foldersMapping = action.payload.reduce((acc, folder) => {
        acc[folder._id] = folder.name;
        return acc;
      }, {});
    },
    setCurrentNote: (state, action) => {
      state.currentNote = action.payload;
    },
    setSideNavActiveSection: (state, action) => {
      state.sideNav.activeSection = action.payload;
    },
    setSideNavActiveFolderId: (state, action) => {
      state.sideNav.activeFolderId = action.payload;
    }
  }
});

export const { setNotes, setFolders, setCurrentNote, setSideNavActiveSection, setSideNavActiveFolderId } = folderNoteSlice.actions;
export const folderNoteReducers = folderNoteSlice.reducer;
