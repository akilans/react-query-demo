import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

// employee schema
const employeeSchema = yup
  .object({
    name: yup.string().required(),
    age: yup.number().positive().integer().required(),
    location: yup.string().required(),
    designation: yup.string().required(),
  })
  .required();

const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(employeeSchema),
  });

  const addEmployee = (employee) => {
    return axios.post("http://localhost:5000/employees", employee);
  };

  const queryClient = useQueryClient();

  const { isLoading, isError, error, mutate, data } = useMutation(addEmployee, {
    onSuccess: () => {
      queryClient.invalidateQueries("employees");
    },
  });

  const onSubmit = (emp_form_data) => {
    mutate(emp_form_data);
    reset();
  };

  if (data?.data) {
    console.log(data.data);
  }

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
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input {...register("name")} type="text" />
        <p>{errors.name?.message}</p>
        <input {...register("age")} type="number" />
        <p>{errors.age?.message}</p>
        <input {...register("location")} type="text" />
        <p>{errors.location?.message}</p>
        <input {...register("designation")} type="text" />
        <p>{errors.designation?.message}</p>
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddEmployee;
