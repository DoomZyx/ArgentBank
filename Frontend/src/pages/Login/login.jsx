import Footer from "../../components/Footer/footer";
import Nav from "../../components/Header/nav";
import "../../main.scss";


function Login() {

  return (
    <>
      <Nav />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form id="form">
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="email"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
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
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Login;
