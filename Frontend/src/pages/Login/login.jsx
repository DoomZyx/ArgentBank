import { useState } from "react";
import { useAuth } from "../../Store/Features/Login/AuthCheck/AuthProvider";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../API/API";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Store/Features/Login/AuthCheck/AuthSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await loginUser(email, password);

      if (result && result.body && result.body.token) {
        login(result.body.token);
        // Sauvegarde le token immédiatement après la connexion
        dispatch(loginSuccess(result.body));
        setErrorMessage("");
        navigate("/user-page");
      } else {
        setErrorMessage("Email ou mot de passe incorrect");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </section>
    </main>
  );
}

export default Login;
