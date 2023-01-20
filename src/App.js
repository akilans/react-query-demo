import { Routes, Route } from "react-router-dom";
import "./App.css";
import AddEmployee from "./components/AddEmployee";
import Dashboard from "./components/Dashboard";
import UpdateEmployee from "./components/EditEmployee";
import Employee from "./components/Employee";
import Employees from "./components/Employees";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import RQemployees from "./components/RQemployees";
import { RequireAuth } from "./requireAuth";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="employees" element={<Employees />} />

          <Route path="employee">
            <Route path=":emp_id" element={<Employee />} />
            <Route path="add" element={<AddEmployee />} />
            <Route path="update/:emp_id" element={<UpdateEmployee />} />
          </Route>

          <Route path="rqemployees" element={<RQemployees />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
