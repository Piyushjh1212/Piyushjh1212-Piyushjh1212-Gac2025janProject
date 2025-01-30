// profileSlice.js (Same as before, make sure you have this)
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: "Piyush Jhariya", // Initial values
  email: "piyush@example.com",
  profilePic: "Assets/profile.webp",
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      return { ...state, ...action.payload }; 
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;