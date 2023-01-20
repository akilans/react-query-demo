import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import http_client from "../utils/axios-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// employee schema
const employeeSchema = yup
  .object({
    name: yup.string().required(),
    age: yup.number().positive().integer().required(),
    location: yup.string().required(),
    designation: yup.string().required(),
  })
  .required();

const UpdateEmployee = () => {
  const notify = () => toast("Wow so easy !");

  const { emp_id } = useParams();

  const fetchEmployee = ({ queryKey }) => {
    console.log("Fetching employee....");
    const emp_id = queryKey[1];
    toast.success("saved");
    return http_client.get(`/employees/${emp_id}`);
    //return axios.get(`http://localhost:5000/employees/${emp_id}`);
  };

  const { data: emp_data } = useQuery(
    ["update-employee", emp_id],
    fetchEmployee,
    {
      enabled: !!emp_id,
      retry: 1,
      staleTime: Infinity,
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(employeeSchema),
  });

  const updateEmployee = (employee) => {
    return axios.put(`http://localhost:5000/employees/${emp_id}`, employee);
  };

  const { isLoading, isError, error, mutate } = useMutation(updateEmployee, {
    onSuccess: notify,
  });

  const onSubmit = (emp_form_data) => {
    mutate(emp_form_data);
  };

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
      <button onClick={notify}>Notify !</button>
      <ToastContainer />
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      {emp_data?.data && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            {...register("name")}
            type="text"
            defaultValue={emp_data?.data.name}
          />
          <p>{errors.name?.message}</p>
          <input
            {...register("age")}
            type="number"
            defaultValue={emp_data?.data.age}
          />
          <p>{errors.age?.message}</p>
          <input
            {...register("location")}
            type="text"
            defaultValue={emp_data?.data.location}
          />
          <p>{errors.location?.message}</p>
          <input
            {...register("designation")}
            type="text"
            defaultValue={emp_data?.data.designation}
          />
          <p>{errors.designation?.message}</p>
          <input type="submit" />
        </form>
      )}
    </div>
  );
};

export default UpdateEmployee;
