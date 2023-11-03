import React, { useState, useEffect } from "react";
import { AllUsers } from "./types";
import "./styles.css";
import axios from "axios";
import { getAllUsers } from "./services/usersCommentServices";

function App() {
  const [currentUser, setCurrentUser] = useState<AllUsers[]>([]);

  useEffect(() => {
    getAllUsers.then((response) => {
      setCurrentUser(response);
    });
  }, []);

  return (
    <div>
      {/* TODO: don't show currentUser here. This is just a test */}
      {currentUser.map((u, index) => (
        <div key={index}>
          <img src={require(`${u.currentUser.image.png}`)} />
          {u.currentUser.username}
        </div>
      ))}
    </div>
  );
}

export default App;
