import Footer from "../../components/Footer/footer";
import Nav from "../../components/Header/nav";
import "../../main.scss";

import { useAuth } from "../../components/AuthCheck/Authcheck";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../API/API";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await loginUser(email, password);

      if (result && result.body && result.body.token) {
        login(result.body.token);
        setErrorMessage("");
        setTimeout(() => {
          navigate("/user-page");
        }, 500);
      } else {
        console.log("Condition non validée : Pas de token");
        setErrorMessage("Email ou mot de passe incorrect");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <>
      <Nav />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form id="form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
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
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
          {errorMessage && (
            <p id="error-message" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Login;
