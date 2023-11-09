import React from "react";
import { AllUsers } from "../../../server/src/types";

type Props = {
  currentUser: AllUsers[];
};

const AddComment = ({ currentUser }: Props) => {
  return (
    <div className="content-style" style={{ marginTop: 0 }}>
      {currentUser.map((u, index) => (
        <div key={index} className="layout-direction-row">
          <div>
            <img src={require(`${u.currentUser.image.png}`)} />
          </div>
          <textarea placeholder="Add a comment..."></textarea>
          <div>
            <button className="send-btn">SEND</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddComment;
