import usersCommentData from "../../data/data";
import { AllUsers } from "../types";

const getEntries = (): AllUsers[] => {
  return usersCommentData;
};

const addComment = () => {
  return null;
};

const findByUsername = (username: string): AllUsers | undefined => {
  const entry = usersCommentData.find(
    (d) => d.currentUser.username === username
  );

  return entry;
};

export default {
  getEntries,
  addComment,
  findByUsername,
};
