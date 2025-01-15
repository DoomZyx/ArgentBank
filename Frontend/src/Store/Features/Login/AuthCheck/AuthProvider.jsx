import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Fournisseur de contexte
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem("token")
  );

  const [user, setUser] = useState(null);

  const login = (token, userData) => {
    console.log("token ajouté :", token);
    sessionStorage.setItem("token", token);
    setUser(userData) // Sauvegarde les données de l'utilisateur 
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log("Déconnexion réussi");
    sessionStorage.removeItem("token");
    setUser(null) // Supprime les données de l'utilisateur 
    setIsAuthenticated(false);
  };

  const getToken = () => {
    return sessionStorage.getItem("token");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour accéder facilement au contexte
export const useAuth = () => useContext(AuthContext);
