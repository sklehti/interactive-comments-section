import React from "react";
import { Comments, Replies, Score, UserInfo } from "../types";
import replyIcon from "./images/icon-reply.svg";
import editIcon from "./images/icon-edit.svg";
import deleteIcon from "./images/icon-delete.svg";
import {
  createScore,
  getComments,
  getReplies,
  scores,
  updateScore,
} from "../services/databaseServices";

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
}: ReplyProps) => {
  const handlePlusScore = (event: React.FormEvent<HTMLButtonElement>) => {
    let newScore: Score;

    if (event.currentTarget.value !== currentUser?.username) {
      if (currentUser?.user_id) {
        if ("id" in reply && reply.id !== undefined) {
          newScore = {
            comment_id: reply.id,
            user_id: currentUser?.user_id,
            comment_type: "r",
          };
        } else {
          newScore = {
            comment_id: reply.comment_id,
            user_id: currentUser?.user_id,
            comment_type: "c",
          };
        }

        scores(newScore).then((response) => {
          if (response.length === 0) {
            createScore(newScore).then((result) => {
              // console.log(result);

              if (newScore.comment_type === "c") {
                getComments().then((response) => {
                  setAllComments(response);
                });
              } else {
                getReplies().then((response) => {
                  setReplies(response);
                });
              }
            });
          } else {
            alert("you have already given a point to a comment!");
          }
        });
      }
    } else {
      alert("You cannot give points for your own comment!");
    }
  };

  const handleMinusScore = (event: React.FormEvent<HTMLButtonElement>) => {
    let score: Score;

    if (event.currentTarget.value !== currentUser?.username) {
      if (currentUser?.user_id) {
        if ("id" in reply && reply.id !== undefined) {
          score = {
            comment_id: reply.id,
            user_id: currentUser?.user_id,
            comment_type: "r",
          };
        } else {
          score = {
            comment_id: reply.comment_id,
            user_id: currentUser?.user_id,
            comment_type: "c",
          };
        }

        scores(score).then((response) => {
          if (response.length > 0) {
            updateScore(score).then((result) => {
              // console.log(result);

              if (score.comment_type === "c") {
                getComments().then((response) => {
                  setAllComments(response);
                });
              } else {
                getReplies().then((response) => {
                  setReplies(response);
                });
              }
            });
          } else {
            alert(
              "You haven't given a point to the comment so you can't remove the point!"
            );
          }
        });
      }
    } else {
      alert("You cannot remove points for your own comment!");
    }
  };

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
