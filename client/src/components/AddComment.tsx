import React, { useState } from "react";
import { UserInfo, Replies, Comments, Comment } from "../types";
import {
  createComment,
  createNewAdminComment,
  getComments,
  getReplies,
} from "../services/databaseServices";

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
}: Props) => {
  const [text, setText] = useState("");

  const handleCommentForm = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const dateObject = new Date();

    if (currentUser) {
      const comment = {
        content: text,
        createdAt: dateObject,
        score: 0,
        username: currentUser.username,
        image_png: currentUser.image_png,
        replyingToUserId: replyingToUserId === undefined ? 0 : replyingToUserId,
      };

      // answer to replies
      if (comment_id && userName) {
        const replies: Replies = {
          ...comment,
          user_id: currentUser.user_id,
          comment_id: comment_id,
          replyingTo: userName,
        };

        createComment(replies).then((response) => {
          console.log(response, "Reply created");

          getReplies().then((response) => {
            setReplies(response);
          });
        });

        // create comment by admin
      } else {
        const newComment: Comment = {
          content: comment.content,
          user_id: currentUser.user_id,
          createdAt: dateObject,
        };

        createNewAdminComment(newComment).then((response) => {
          console.log(response, "Reply created");

          getComments().then((response) => {
            setAllComments(response);
          });
        });
      }
      setText("");
      setReplyForm({ username: "", command_id: -1 });
    } else {
      console.log("Jokin meni pieleen. Yritä uudestaan.");
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
