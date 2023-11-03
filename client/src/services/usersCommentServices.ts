import axios from "axios";
import { AllUsers } from "../types";

const baseUrl = "http://localhost:3001/api/comments";

export const getAllUsers = axios
  .get<AllUsers[]>(baseUrl)
  .then((response) => response.data);
