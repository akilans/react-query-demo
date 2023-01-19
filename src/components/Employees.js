import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context";

const Employees = () => {
  const [isLoading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const auth = useAuth();

  const fetchEmployees = async () => {
    console.log("Fetching employees.....");
    try {
      const response = await axios.get("http://localhost:5000/employees");
      console.log(response);
      console.log(response.data);
      setEmployees(response.data);
    } catch (err) {
      setIsError(true);
      setErrorMsg(err.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchEmployees();
    setLoading(false);
  }, []);

  if (isError) {
    return <p>Error - {errorMsg}</p>;
  }

  if (isLoading) {
    return <p>Loading....</p>;
  }
  console.log("User Details ");
  console.log(auth.userDetails);

  return (
    <div>
      <h1>User - {auth.user}</h1>
      <h1>Role - {auth.role}</h1>
      <h1>User Detail name - {auth.userDetails.name}</h1>
      <h1>User Detail role - {auth.userDetails.role}</h1>
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Location</th>
            <th>Designation</th>
          </tr>
          {employees.map((emp) => {
            return (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.age}</td>
                <td>{emp.location}</td>
                <td>{emp.designation}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
