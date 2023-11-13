import React, { useState } from "react";
import { AllUsers } from "../../../server/src/types";
import { UserInfo, CurrentUser } from "../types";

type Props = {
  // currentUser: AllUsers[];
  currentUser: UserInfo | undefined;
  replyingTo: boolean;
};

const AddComment = ({ currentUser, replyingTo }: Props) => {
  const [text, setText] = useState("");

  const handleCommentForm = (event: React.SyntheticEvent) => {
    event.preventDefault();

    setText("");
  };

  return (
    <div className="content-style" style={{ marginTop: 0 }}>
      {/* {currentUser?.map((u, index) => ( */}
      <form
        // key={index}
        className="layout-direction-row"
        onSubmit={handleCommentForm}
      >
        <div>
          {/* <img src={require(`${u.currentUser.image.png}`)} /> */}
          {currentUser !== undefined ? (
            <img src={require(`${currentUser.image_png}`)} />
          ) : (
            <></>
          )}
        </div>
        <textarea
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
      </form>
      {/* ))} */}
    </div>
  );
};

export default AddComment;
