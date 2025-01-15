import { loginSuccess, setError } from "../../Store/Login/AuthSlice";
import { loginUser } from "../../API/API";

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


