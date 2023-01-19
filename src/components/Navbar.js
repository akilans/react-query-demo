import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context";

const Navbar = () => {
  const auth = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {!auth.user && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
        {auth.user && (
          <>
            <li>
              <NavLink to="employees">Employees</NavLink>
            </li>
            <li>
              <NavLink onClick={auth.logout}>Logout</NavLink>
            </li>
            <h1>User - {auth.user}</h1>
            <h1>Role - {auth.role}</h1>
            {console.log(auth.userDetails)}
            <h1>User Detail name - {auth.userDetails.name}</h1>
            <h1>User Detail role - {auth.userDetails.role}</h1>
            {auth.role === "admin" && (
              <li>
                <NavLink to="dashboard">Dashboard</NavLink>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
