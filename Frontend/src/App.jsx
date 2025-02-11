import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Home/home";
import Login from "./pages/Login/login";
import UserPage from "./pages/Users/users";
import { AuthProvider } from "./Store/Features/Login/AuthCheck/AuthProvider";
import ProtectedRoute from "./components/Authentification/authentification";
import "../src/main.scss";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/user-page"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
