import React, { useState, useEffect } from "react";
import { Comments, Replies, UserInfo } from "./types";
import "./styles.css";
import {
  getAllUsers,
  getComments,
  getReplies,
} from "./services/databaseServices";
import AllComments from "./components/AllComments";

function App() {
  const [currentUser, setCurrentUser] = useState<UserInfo>();
  const [allComments, setAllComments] = useState<Comments[]>([]);

  const [allUser, setAllUser] = useState<UserInfo[]>([]);
  const [replies, setReplies] = useState<Replies[]>([]);

  // useEffect(() => {
  //   getAllUsers.then((response) => {
  //     setCurrentUser(response);
  //      console.log(response);
  //     setAllComments(response[0].comments);
  //   });
  // }, []);

  useEffect(() => {
    getAllUsers().then((response) => {
      setAllUser(response);

      response.map((r) => {
        return r.admin === 1 ? setCurrentUser(r) : "";
      });
    });

    getComments().then((response) => {
      setAllComments(response);
    });

    getReplies().then((response) => {
      setReplies(response);
    });
  }, []);

  return (
    <div className="app">
      <AllComments
        allComments={allComments}
        currentUser={currentUser}
        allUsers={allUser}
        replies={replies}
        setAllComments={setAllComments}
        setReplies={setReplies}
      />
    </div>
  );
}

export default App;
