import React from "react";
import { Comments, Replies, UserInfo } from "../types";
import replyIcon from "./images/icon-reply.svg";
import editIcon from "./images/icon-edit.svg";
import deleteIcon from "./images/icon-delete.svg";

type ReplyProps = {
  setReplyForm: React.Dispatch<
    React.SetStateAction<{ username: string; command_id: number }>
  >;
  reply: Replies | Comments;
  currentUser: UserInfo | undefined;
  handlePlusScore: (event: React.FormEvent<HTMLButtonElement>) => void;
  handleMinusScore: (event: React.FormEvent<HTMLButtonElement>) => void;
  setDeleteCommentId: React.Dispatch<React.SetStateAction<number>>;
  setDeleteId: React.Dispatch<React.SetStateAction<number>>;
  setEditText: React.Dispatch<React.SetStateAction<number>>;
};

const AnswerToReply = ({
  setReplyForm,
  reply,
  currentUser,
  handlePlusScore,
  handleMinusScore,
  setDeleteCommentId,
  setDeleteId,
  setEditText,
}: ReplyProps) => {
  const handleDeleteModal = (reply: Replies | Comments) => {
    const modal = document.getElementById("myModal");

    if ("id" in reply) {
      setDeleteId(Number(reply.id));
    } else if ("comment_id" in reply) {
      setDeleteCommentId(Number(reply.comment_id));
    } else {
      console.log("do delete comment action here!");
    }

    if (modal) {
      modal.style.display = "block";
    }
  };

  const handleContentEdit = () => {
    if ("id" in reply && reply.id !== undefined) {
      setEditText(reply.id);
    } else {
      setEditText(reply.comment_id);
    }
  };

  return (
    <>
      <div className="mobile-view">
        <div className="layout-direction-row score-style">
          <button
            className="score-btn"
            value={reply.username}
            onClick={handlePlusScore}
          >
            +
          </button>
          {reply.score}
          <button
            className="score-btn"
            value={reply.username}
            onClick={handleMinusScore}
          >
            -
          </button>
        </div>
      </div>
      <div className="reply-btn-layout">
        {reply.username !== currentUser?.username ? (
          <button
            className="reply-btn"
            // value={replyForm}
            onClick={() =>
              setReplyForm(
                reply?.username
                  ? { username: reply.username, command_id: reply.comment_id }
                  : { username: "", command_id: -1 }
              )
            }
          >
            <img src={replyIcon} alt="reply icon" className="reply-img" />
            Reply
          </button>
        ) : (
          <>
            <button
              className="delete-btn"
              onClick={() => handleDeleteModal(reply)}
            >
              <img src={deleteIcon} alt="delete icon" className="delete-img" />
              Delete
            </button>
            <button className="reply-btn" onClick={handleContentEdit}>
              <img src={editIcon} alt="edit icon" className="reply-img" />
              Edit
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default AnswerToReply;
