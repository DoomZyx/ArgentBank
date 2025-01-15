import { loginSuccess, setError } from "../Features/Login/AuthCheck/AuthSlice";
import { loginUser } from "../../API/API";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "../../API/API";

export const loginThunk = (email, password) => async (dispatch) => {
  try {
    const result = await loginUser(email, password);
    if (result && result.body && result.body.token) {
      dispatch(loginSuccess(result.body.token));
    } else {
      dispatch(setError("Email ou mot de passe incorrect."));
    }
  } catch (error) {
    dispatch(setError("Une erreur s'est produite lors de la connexion"));
  }
};

// Récupération des données de l'utilsateur en appelant l'API getUser

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (token, { isRejectedWithValue }) => {
    try {
      const data = await getUser(token);
      console.log(data.body);
      return data.body;
    } catch (error) {
      return isRejectedWithValue(error.message);
    }
  }
);
