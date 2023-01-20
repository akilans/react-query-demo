//import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import http_client from "../utils/axios-client";

const Employee = () => {
  const { emp_id } = useParams();

  const fetchEmployee = ({ queryKey }) => {
    const emp_id = queryKey[1];
    return http_client.get(`/employees/${emp_id}`);
    //return axios.get(`http://localhost:5000/employees/${emp_id}`);
  };

  const { isLoading, isError, error, data } = useQuery(
    ["employee", emp_id],
    fetchEmployee,
    {
      retry: 1,
    }
  );

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  if (isError) {
    return <div>{error.response.status === 404 && <p> User not found</p>}</div>;
  }

  return (
    <div>
      <div>
        <h1>Employee Details</h1>
        <p>ID - {data?.data.id}</p>
        <p>Name - {data?.data.name}</p>
        <p>Age - {data?.data.age}</p>
        <p>Location - {data?.data.location}</p>
        <p>Designation - {data?.data.designation}</p>
      </div>
    </div>
  );
};

export default Employee;
