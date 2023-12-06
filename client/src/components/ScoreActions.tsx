import React from "react";
import { Comments, Replies, UserInfo } from "../types";
import { handleMinusScore, handlePlusScore } from "./ScoreFunctions";

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
