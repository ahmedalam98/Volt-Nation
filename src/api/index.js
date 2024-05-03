import axios from "axios";

const api = axios.create({
  baseURL: "https://volt-nation.up.railway.app",
});
export default api;
