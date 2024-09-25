import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="login-btn" onClick={() => loginWithRedirect()}>Login</button>;
};

export default LoginButton;