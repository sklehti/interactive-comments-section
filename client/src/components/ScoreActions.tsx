import React from "react";
import { Comments, Replies, UserInfo } from "../types";
import { handleMinusScore, handlePlusScore } from "./ScoreFunctions";
import { Socket } from "socket.io-client";

type Props = {
  c: Comments | Replies;
  currentUser: UserInfo | undefined;
  setAllComments: React.Dispatch<React.SetStateAction<Comments[]>>;
  setReplies: React.Dispatch<React.SetStateAction<Replies[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket;
};

const ScoreActions = ({
  c,
  currentUser,
  setAllComments,
  setReplies,
  setErrorMessage,
  socket,
}: Props) => {
  return (
    <div className="score-layout">
      <div className="layout-direction-column score-style">
        <button
          className="score-btn"
          value={c.username}
          onClick={(event) =>
            handlePlusScore({
              reply: c,
              currentUser,
              setAllComments,
              setReplies,
              event,
              setErrorMessage,
              socket,
            })
          }
        >
          +
        </button>
        {c.score}
        <button
          className="score-btn"
          value={c.username}
          onClick={(event) =>
            handleMinusScore({
              reply: c,
              currentUser,
              setAllComments,
              setReplies,
              event,
              setErrorMessage,
              socket,
            })
          }
        >
          -
        </button>
      </div>
    </div>
  );
};

export default ScoreActions;
