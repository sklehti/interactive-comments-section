import React from "react";
import { Comments, Replies, Score, UserInfo } from "../types";
import {
  createScore,
  getComments,
  getReplies,
  scores,
  updateScore,
} from "../services/databaseServices";

type Props = {
  c: Comments | Replies;
  currentUser: UserInfo | undefined;
  setAllComments: React.Dispatch<React.SetStateAction<Comments[]>>;
  setReplies: React.Dispatch<React.SetStateAction<Replies[]>>;
};

const ScoreActions = ({
  c,
  currentUser,
  setAllComments,
  setReplies,
}: Props) => {
  const handlePlusScore = (event: React.FormEvent<HTMLButtonElement>) => {
    let newScore: Score;

    if (event.currentTarget.value !== currentUser?.username) {
      if (currentUser?.user_id) {
        if ("id" in c && c.id !== undefined) {
          newScore = {
            comment_id: c.id,
            user_id: currentUser?.user_id,
            comment_type: "r",
          };
        } else {
          newScore = {
            comment_id: c.comment_id,
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
        if ("id" in c && c.id !== undefined) {
          score = {
            comment_id: c.id,
            user_id: currentUser?.user_id,
            comment_type: "r",
          };
        } else {
          score = {
            comment_id: c.comment_id,
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

  return (
    <div className="score-layout">
      <div className="layout-direction-column score-style">
        <button
          className="score-btn"
          value={c.username}
          onClick={handlePlusScore}
        >
          +
        </button>
        {c.score}
        <button
          className="score-btn"
          value={c.username}
          onClick={handleMinusScore}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default ScoreActions;
