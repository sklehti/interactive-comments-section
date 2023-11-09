import React, { useState, useEffect } from "react";
import { AllUsers, Comments, Replies } from "./types";
import "./styles.css";
import axios from "axios";
import { getAllUsers } from "./services/usersCommentServices";
import AllComments from "./components/AllComments";
import { CurrentUser } from "../../server/src/types";

function App() {
  const [currentUser, setCurrentUser] = useState<AllUsers[]>([]);
  const [allComments, setAllComments] = useState<Comments[]>([]);

  useEffect(() => {
    getAllUsers.then((response) => {
      setCurrentUser(response);
      console.log(response);
      setAllComments(response[0].comments);
    });
  }, []);

  console.log(allComments);

  return (
    <div className="app">
      <AllComments allComments={allComments} currentUser={currentUser} />
    </div>
  );
}

export default App;
