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
    // Lorsqu'un utilisateur se connecte avec succès
    login: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      state.isLoggedIn = true;
      sessionStorage.setItem("token", token); // Synchronise avec sessionStorage
    },
    loginSuccess: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      sessionStorage.setItem("token", token);
      state.isLoggedIn = true;
      state.user = action.payload; // Stocke les données utilisateur
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
      sessionStorage.removeItem("token"); // Supprime le token de sessionStorage
    },
    setUser: (state, action) => {
      state.user = action.payload; // Met à jour les données utilisateur
    },
    setError: (state, action) => {
      state.error = action.payload; // Gère les erreurs
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
