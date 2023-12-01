import React, { useState, useEffect } from "react";
import { Comments, Replies, UserInfo } from "./types";
import "./styles.css";
import {
  getAllUsers,
  getComments,
  getReplies,
  deleteReplies,
  deleteComment,
} from "./services/databaseServices";
import AllComments from "./components/AllComments";

function App() {
  const [currentUser, setCurrentUser] = useState<UserInfo>();
  const [allComments, setAllComments] = useState<Comments[]>([]);
  const [deleteCommentId, setDeleteCommentId] = useState(-1);
  const [deleteId, setDeleteId] = useState(-1);

  const [allUser, setAllUser] = useState<UserInfo[]>([]);
  const [replies, setReplies] = useState<Replies[]>([]);

  const modal = document.getElementById("myModal");

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
  }, [setAllUser, deleteCommentId, deleteId]);

  const handleCancel = () => {
    if (modal) {
      modal.style.display = "none";
    }
  };

  const handleDelete = () => {
    if (deleteId > -1) {
      deleteReplies(deleteId).then((result) => {
        console.log(result);

        setDeleteId(-1);
      });
    } else if (deleteCommentId > -1) {
      deleteComment(deleteCommentId).then((result) => {
        console.log(result);

        setDeleteCommentId(-1);
      });
    }

    if (modal) {
      modal.style.display = "none";
    }
  };

  return (
    <div className="app">
      <div id="myModal" className="modal">
        <div className="modal-content">
          <h4>Delete comment</h4>
          <p>
            Are you sure you want to delete this comment? This will remove the
            comment and can&apos;t be undone.
          </p>
          <div
            className="layout-direction-row"
            style={{ justifyContent: "space-between" }}
          >
            <button
              className="modal-btn modal-cancel-btn"
              onClick={handleCancel}
            >
              No, cancel
            </button>
            <button
              className="modal-btn modal-delete-btn"
              onClick={handleDelete}
            >
              Yes, delete
            </button>
          </div>
        </div>
      </div>

      <AllComments
        allComments={allComments}
        currentUser={currentUser}
        allUsers={allUser}
        replies={replies}
        setAllComments={setAllComments}
        setReplies={setReplies}
        setDeleteCommentId={setDeleteCommentId}
        setDeleteId={setDeleteId}
      />
    </div>
  );
}

export default App;
