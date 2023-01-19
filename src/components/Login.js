import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context";

const Login = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const redirectPath = location.state?.path || "/";

  const handleLogin = (role) => {
    console.log("Loging in....");
    console.log(auth.user);

    const loginuser = {
      id: 1,
      name: role === "admin" ? "Akilan" : "Inba",
      role: role,
    };

    auth.login(loginuser);
    console.log("login success");
    console.log(auth.user);
    navigate(redirectPath, { replace: true });
  };
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => handleLogin("user")}>Login as user</button>
      <button onClick={() => handleLogin("admin")}>Login as admin</button>
    </div>
  );
};

export default Login;
