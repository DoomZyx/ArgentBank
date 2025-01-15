import { loginSuccess, setError } from "../../Store/Login/AuthSlice";
import { loginUser } from "../../API/API";
import { isRejectedWithValue } from "../../../node_modules/@reduxjs/toolkit/dist/index";

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
  async (token, { isRejectedWithValue}) => {
    try {
      const data = await getUser(token);
      return data.body;
    } catch (error) {
      return isRejectedWithValue(error.message);
    }
  }
);
