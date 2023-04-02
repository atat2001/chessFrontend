import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api/chess",
  headers: {
    "Content-type": "application/json"
  }
});