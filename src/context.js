import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

// auth provider
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [userDetails, setuserDetails] = useState(
    JSON.parse(localStorage.getItem("user-details"))
  );

  // login function
  // set user details with role
  const login = (user) => {
    console.log("Logging in...");
    localStorage.setItem("user", user.name);
    localStorage.setItem("role", user.role);
    setUser(user.name);
    setRole(user.role);
    localStorage.setItem("user-details", JSON.stringify(user));
    setuserDetails({ ...userDetails, ...user });
  };

  // logout call
  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("user-details");
    setUser(null);
    setRole(null);
    setuserDetails(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ userDetails, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// call this wherever you want to check user info
export const useAuth = () => {
  return useContext(AuthContext);
};
