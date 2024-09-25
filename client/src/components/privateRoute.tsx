import React from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

interface PrivateRouteProps {
  component: React.ComponentType<RouteProps>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Carregando...</div>;

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;