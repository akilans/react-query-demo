import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const fetchEmployees = () => {
  return axios.get("http://localhost:5000/employees");
};

const RQemployees = () => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    "employees",
    fetchEmployees,
    {
      enabled: false,
    }
  );

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  if (isError) {
    return (
      <div>
        {error.response.status} - {error.message}
      </div>
    );
  }

  return (
    <div>
      <button onClick={refetch}>Get Employees</button>
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Location</th>
            <th>Designation</th>
          </tr>
          {data?.data.map((emp) => {
            return (
              <>
                <Link to={`/employee/${emp.id}`}>{emp.name}</Link>
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.age}</td>
                  <td>{emp.location}</td>
                  <td>{emp.designation}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RQemployees;
