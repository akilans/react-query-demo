import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./context";

// require auth to protect routes
export const RequireAuth = () => {
  console.log("Checking authentication....");
  const location = useLocation();
  const auth = useAuth();
  console.log(auth);
  if (!auth.user) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return <Outlet />;
};
