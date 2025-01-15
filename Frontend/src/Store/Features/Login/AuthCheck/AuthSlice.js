import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../../../API/getAPI"; 

const initialState = {
  token: sessionStorage.getItem("token") || null, // Récupérer le token
  isLoggedIn: !!sessionStorage.getItem("token"),
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  },
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    login: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.user = {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
      };
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload; // Mettre à jour les données utilisateur
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload; // Enregistrer l'erreur
      });
  },
});

export const { loginSuccess, login, logout, setUser, setError } =
  authSlice.actions;
export default authSlice.reducer;
