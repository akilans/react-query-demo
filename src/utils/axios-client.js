import axios from "axios";

const http_client = axios.create({
  baseURL: "http://localhost:5000",
});

export default http_client;
