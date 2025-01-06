import Footer from "../../components/Footer/footer";
import Nav from "../../components/Header/nav";
import "../../main.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../API/ReduxAPI/getAPIRedux";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error } = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginThunk(email, password));
    navigate("/user-page");
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
          {error && <p style={{ color: "red" }}>{error}</p>}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Login;
