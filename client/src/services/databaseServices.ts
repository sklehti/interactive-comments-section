import axios from "axios";
import { Comments, Replies, UserInfo } from "../types";

const baseUrl = "http://localhost:3001/api/database";

export const getAllUsers = axios
  .get<UserInfo[]>(`${baseUrl}/allUsers`)
  .then((response) => response.data);

export const getComments = axios
  .get<Comments[]>(`${baseUrl}`)
  .then((response) => response.data);

export const getReplies = axios
  .get<Replies[]>(`${baseUrl}/replies`)
  .then((response) => response.data);
