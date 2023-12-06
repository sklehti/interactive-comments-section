import React from "react";
import { Comments, Replies, Score, UserInfo } from "../types";
import {
  createScore,
  getComments,
  getReplies,
  scores,
  updateScore,
} from "../services/databaseServices";
import { toNewScore } from "../utils";

type Props = {
  reply: Replies | Comments;
  currentUser: UserInfo | undefined;
  setAllComments: React.Dispatch<React.SetStateAction<Comments[]>>;
  setReplies: React.Dispatch<React.SetStateAction<Replies[]>>;
  event: React.FormEvent<HTMLButtonElement>;
};

export const handlePlusScore = ({
  reply,
  currentUser,
  setAllComments,
  setReplies,
  event,
}: Props) => {
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

      const createdScore = toNewScore(newScore);

      scores(createdScore).then((response) => {
        if (response.length === 0) {
          createScore(newScore).then(() => {
            if (createdScore.comment_type === "c") {
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

export const handleMinusScore = ({
  reply,
  currentUser,
  setAllComments,
  setReplies,
  event,
}: Props) => {
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

      const createdScore = toNewScore(score);

      scores(createdScore).then((response) => {
        if (response.length > 0) {
          updateScore(score).then(() => {
            if (createdScore.comment_type === "c") {
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
