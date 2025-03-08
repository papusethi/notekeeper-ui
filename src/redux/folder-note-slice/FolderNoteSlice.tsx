import { createSlice } from '@reduxjs/toolkit';

export interface INote {
  _id: string;
  title: string;
  content: string;
  isPinned: boolean;
  isStarred: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  folderId: string | null;
  updatedAt: string;
  createdAt: string;
}

export interface IFolder {
  _id: string;
  name: string;
}

const folderNoteSlice = createSlice({
  name: 'folderNote',
  initialState: {
    notes: [] as INote[],
    folders: [] as IFolder[],
    foldersMapping: null as null | Record<string, string>,
    currentNote: null as null | INote,
    sideNav: {
      activeSection: 'home',
      activeFolderId: null as null | string
    }
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setFolders: (state, action) => {
      state.folders = action.payload;
      state.foldersMapping = action.payload.reduce((acc: Record<string, string>, folder: IFolder) => {
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
