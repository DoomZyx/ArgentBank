import { useState } from "react";
import Footer from "../../components/Footer/footer";
import Nav from "../../components/Header/nav";
import "../../main.scss";
import { loginUser } from "../../API/API";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(email, password);

      if (response && response.body && response.body.token) {
        localStorage.setItem("token", response.body.token); // Stocker le token
        setTimeout(() => {
          window.location.href = "/user-page";
        }, 500);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Une erreur est survenue.");
      }
    } catch (error) {
      setError("Erreur de connexion. Veuillez réessayer.");
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
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
            {error && <p className="error">{error}</p>}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Login;
