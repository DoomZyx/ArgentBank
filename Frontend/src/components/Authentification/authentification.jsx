import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

//  Validation des props
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Vérifie que l'enfant est bien passé
};

export default ProtectedRoute;