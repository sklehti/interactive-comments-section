import axios from "axios";
import { Comments, Comment, Replies, UserInfo, Score } from "../types";

const baseUrl = "http://localhost:3001/api/database";

export const getAllUsers = () =>
  axios
    .get<UserInfo[]>(`${baseUrl}/allUsers`)
    .then((response) => response.data);

export const getComments = () =>
  axios.get<Comments[]>(`${baseUrl}`).then((response) => response.data);

export const getReplies = () =>
  axios.get<Replies[]>(`${baseUrl}/replies`).then((response) => response.data);

export const scores = (scoreInfo: Score) =>
  axios.post(`${baseUrl}/scores`, scoreInfo).then((response) => response.data);

export const createNewAdminComment = (newComment: Comment) =>
  axios
    .post(`${baseUrl}/newComment`, newComment)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
    });

export const createComment = (comment: Replies) =>
  axios
    .post(`${baseUrl}/replies`, comment)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
    });

export const updateComment = (content: string, id: number) =>
  axios
    .put(`${baseUrl}/updateComment`, { content, id })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
    });

export const createScore = (newScore: Score) =>
  axios
    .post(`${baseUrl}/addScore`, newScore)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
    });

export const updateScore = (newScore: Score) =>
  axios
    .put(`${baseUrl}/removeScore`, newScore)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
    });

export const updateReplies = (content: string, id: number) =>
  axios
    .put(`${baseUrl}/updateReplies`, { content, id })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
    });

export const deleteReplies = (id: number) =>
  axios.delete(`${baseUrl}/replies/${id}`).then((response) => response.data);

export const deleteComment = (id: number) =>
  axios.delete(`${baseUrl}/comments/${id}`).then((response) => response.data);
