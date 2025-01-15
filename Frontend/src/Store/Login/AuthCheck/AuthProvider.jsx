import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Fournisseur de contexte
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem("token")
  );

  const login = (token) => {
    console.log("token ajouté :", token);
    sessionStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log("Déconnexion réussi");
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const getToken = () => {
    return sessionStorage.getItem("token");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour accéder facilement au contexte
export const useAuth = () => useContext(AuthContext);
