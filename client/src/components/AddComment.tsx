import React, { useEffect, useState } from "react";
import { UserInfo, Replies, Comments, Comment } from "../types";
import {
  createComment,
  createNewAdminComment,
  getComments,
  getReplies,
} from "../services/databaseServices";
import { toNewReplies, toNewComment } from "../utils";
import { parseError } from "./ErrorFunction";
import { Socket } from "socket.io-client";

type Props = {
  currentUser: UserInfo | undefined;
  replyingTo: boolean;
  replyingToUserId: number | undefined;
  comment_id: number | undefined;
  userName: string | undefined;
  setReplyForm: React.Dispatch<
    React.SetStateAction<{ username: string; command_id: number }>
  >;
  setAllComments: React.Dispatch<React.SetStateAction<Comments[]>>;
  setReplies: React.Dispatch<React.SetStateAction<Replies[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket;
};

const AddComment = ({
  currentUser,
  replyingTo,
  replyingToUserId,
  comment_id,
  userName,
  setReplyForm,
  setAllComments,
  setReplies,
  setErrorMessage,
  socket,
}: Props) => {
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("allComments", (data) => {
      setAllComments(data);
    });

    socket.on("allReplies", (data) => {
      setReplies(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCommentForm = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const dateObject = new Date();

    if (currentUser) {
      if (text.length < 1) {
        alert("Comment field cannot be empty.");
      } else {
        const comment = {
          content: text,
          createdAt: dateObject,
          score: 0,
          username: currentUser.username,
          image_png: currentUser.image_png,
          image_webp: currentUser.image_webp,
          replyingToUserId:
            replyingToUserId === undefined ? 0 : replyingToUserId,
        };

        // answer to replies
        if (comment_id && userName) {
          const replies: Replies = {
            ...comment,
            user_id: currentUser.user_id,
            comment_id: comment_id,
            replyingTo: userName,
          };

          const newReply = toNewReplies(replies);

          createComment(newReply)
            .then(() => {
              getReplies()
                .then((response) => {
                  setReplies(response);
                })
                .catch((error) => {
                  setErrorMessage(parseError(error));
                  setTimeout(() => {
                    setErrorMessage("");
                  }, 3000);
                });
            })
            .catch((error) => {
              setErrorMessage(parseError(error));
              setTimeout(() => {
                setErrorMessage("");
              }, 3000);
            });

          // create comment by admin
        } else {
          const createdComment: Comment = {
            content: comment.content,
            user_id: currentUser.user_id,
            createdAt: dateObject,
          };

          const newComment = toNewComment(createdComment);

          createNewAdminComment(newComment)
            .then(() => {
              getComments()
                .then((response) => {
                  setAllComments(response);
                })
                .catch((error) => {
                  setErrorMessage(parseError(error));
                  setTimeout(() => {
                    setErrorMessage("");
                  }, 3000);
                });
            })
            .catch((error) => {
              setErrorMessage(parseError(error));
              setTimeout(() => {
                setErrorMessage("");
              }, 3000);
            });
        }

        setText("");
        setReplyForm({ username: "", command_id: -1 });
      }
    } else {
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="content-style" style={{ marginTop: 0 }}>
      <form onSubmit={handleCommentForm}>
        <div className="mobile-form-content-layout">
          <textarea
            className="mobile-view"
            placeholder="Add a comment..."
            value={text}
            onChange={({ target }) => setText(target.value)}
          ></textarea>
        </div>
        <div className="responsive-form-view">
          <div>
            {currentUser !== undefined ? (
              <img src={require(`${currentUser.image_png}`)} />
            ) : (
              <></>
            )}
          </div>
          <textarea
            className="desktop-view"
            placeholder="Add a comment..."
            value={text}
            onChange={({ target }) => setText(target.value)}
          ></textarea>
          <div>
            {replyingTo ? (
              <button className="send-btn" type="submit">
                REPLY
              </button>
            ) : (
              <button className="send-btn" type="submit">
                SEND
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
