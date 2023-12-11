import React from "react";
import { Comments, Replies, Score, UserInfo } from "../types";
import {
  createScore,
  getComments,
  getReplies,
  scores,
  updateScore,
} from "../services/databaseServices";
import { parseError } from "./ErrorFunction";
import { toNewScore } from "../utils";
import { Socket } from "socket.io-client";

type Props = {
  reply: Replies | Comments;
  currentUser: UserInfo | undefined;
  setAllComments: React.Dispatch<React.SetStateAction<Comments[]>>;
  setReplies: React.Dispatch<React.SetStateAction<Replies[]>>;
  event: React.FormEvent<HTMLButtonElement>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket;
};

export const handlePlusScore = ({
  reply,
  currentUser,
  setAllComments,
  setReplies,
  event,
  setErrorMessage,
  socket,
}: Props) => {
  let newScore: Score;

  // Note! add the following if-condition if you want to remove the option to add a point to your comment
  // if (event.currentTarget.value !== currentUser?.username) {
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

    scores(createdScore)
      .then((response) => {
        if (response.length === 0) {
          createScore(newScore).then(() => {
            if (createdScore.comment_type === "c") {
              getComments()
                .then((response) => {
                  setAllComments(response);

                  socket.on("allComments", (data) => {
                    setAllComments(data);
                  });
                })
                .catch((error) => {
                  setErrorMessage(parseError(error));
                  setTimeout(() => {
                    setErrorMessage("");
                  }, 3000);
                });
            } else {
              getReplies()
                .then((response) => {
                  setReplies(response);

                  socket.on("allReplies", (data) => {
                    setReplies(data);
                  });
                })
                .catch((error) => {
                  setErrorMessage(parseError(error));
                  setTimeout(() => {
                    setErrorMessage("");
                  }, 3000);
                });
            }
          });

          return () => {
            socket.disconnect();
          };
        } else {
          alert("you have already given a point to a comment!");
        }
      })
      .catch((error) => {
        setErrorMessage(parseError(error));
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      });
  }
  // } else {
  //   alert("You cannot give points for your own comment!");
  // }
};

export const handleMinusScore = ({
  reply,
  currentUser,
  setAllComments,
  setReplies,
  event,
  setErrorMessage,
  socket,
}: Props) => {
  let score: Score;

  // Note! add the following if-condition if you want to remove the option to remove a point to your comment
  // if (event.currentTarget.value !== currentUser?.username) {
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

    scores(createdScore)
      .then((response) => {
        if (response.length > 0) {
          updateScore(score)
            .then(() => {
              if (createdScore.comment_type === "c") {
                getComments()
                  .then((response) => {
                    setAllComments(response);

                    socket.on("allComments", (data) => {
                      setAllComments(data);
                    });
                  })
                  .catch((error) => {
                    setErrorMessage(parseError(error));
                    setTimeout(() => {
                      setErrorMessage("");
                    }, 3000);
                  });
              } else {
                getReplies()
                  .then((response) => {
                    setReplies(response);

                    socket.on("allReplies", (data) => {
                      setReplies(data);
                    });
                  })
                  .catch((error) => {
                    setErrorMessage(parseError(error));
                    setTimeout(() => {
                      setErrorMessage("");
                    }, 3000);
                  });
              }
            })
            .catch((error) => {
              setErrorMessage(parseError(error));
              setTimeout(() => {
                setErrorMessage("");
              }, 3000);
            });
        } else {
          alert(
            "You haven't given a point to the comment so you can't remove the point!"
          );
        }
      })
      .catch((error) => {
        setErrorMessage(parseError(error));
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      });
  }
  // } else {
  //   alert("You cannot remove points for your own comment!");
  // }
};
