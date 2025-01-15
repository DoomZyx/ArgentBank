import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Etat de connexion
    login: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
    },
    // Met à jour les données de l'utilisateur 
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Active/Désactive l'état de chargement
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
});

export const { login, loginSuccess, logout, setUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;