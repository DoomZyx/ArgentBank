import agentBankLogo from "../../assets/img/argentBankLogo.webp";
import { useAuth } from "../../Store/Features/Login/AuthCheck/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Nav() {
  const { isAuthenticated, logout } = useAuth();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="./index.html">
        <img
          className="main-nav-logo-image"
          src={agentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      {isAuthenticated && <p className="user-name">{user.userName}</p>}
      <div>
        <ul>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          ) : (
            <a className="main-nav-item" href="./sign-in.html">
              <i className="fa fa-user-circle"></i>
              Sign In
            </a>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
