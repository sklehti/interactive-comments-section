import React from "react";
import { Comments, Replies, UserInfo } from "../types";
import replyIcon from "./images/icon-reply.svg";
import editIcon from "./images/icon-edit.svg";
import deleteIcon from "./images/icon-delete.svg";
import { handleMinusScore, handlePlusScore } from "./ScoreFunctions";

type ReplyProps = {
  setReplyForm: React.Dispatch<
    React.SetStateAction<{ username: string; command_id: number }>
  >;
  reply: Replies | Comments;
  currentUser: UserInfo | undefined;
  setDeleteCommentId: React.Dispatch<React.SetStateAction<number>>;
  setDeleteId: React.Dispatch<React.SetStateAction<number>>;
  setEditText: React.Dispatch<React.SetStateAction<number>>;
  setAllComments: React.Dispatch<React.SetStateAction<Comments[]>>;
  setReplies: React.Dispatch<React.SetStateAction<Replies[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setHasStartedTyping: React.Dispatch<React.SetStateAction<boolean>>;
};

const AnswerToReply = ({
  setReplyForm,
  reply,
  currentUser,
  setDeleteCommentId,
  setDeleteId,
  setEditText,
  setAllComments,
  setReplies,
  setErrorMessage,
  setHasStartedTyping,
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
      setHasStartedTyping(false);
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
            onClick={(event) =>
              handlePlusScore({
                reply,
                currentUser,
                setAllComments,
                setReplies,
                event,
                setErrorMessage,
              })
            }
          >
            +
          </button>
          <div style={{ padding: "2px" }}>{reply.score}</div>

          <button
            className="score-btn"
            value={reply.username}
            onClick={(event) =>
              handleMinusScore({
                reply,
                currentUser,
                setAllComments,
                setReplies,
                event,
                setErrorMessage,
              })
            }
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
