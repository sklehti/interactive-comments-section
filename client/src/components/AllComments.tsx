import React, { useState } from "react";
import { AllUsers, Comments } from "../types";
import AddComment from "./AddComment";
import replyIcon from "./images/icon-reply.svg";

type Props = {
  allComments: Comments[];
  currentUser: AllUsers[];
};

const AllComments = ({ allComments, currentUser }: Props) => {
  const [replyForm, setReplyForm] = useState("");

  return (
    <div>
      {allComments.map((c) => (
        <div key={c.id}>
          <div className="content-style">
            <div className="layout-direction-row">
              <div className="layout-direction-column score-style">
                <button className="score-btn">+</button>
                {c.score}
                <button className="score-btn">-</button>
              </div>

              <img src={require(`${c.user?.image?.png}`)} alt="dynamic" />
              <div>
                <b>{c.user?.username}</b>
              </div>
              <div style={{ padding: "0 10px" }}>{c.createdAt}</div>
              <div className="reply-btn-layout">
                <button
                  className="reply-btn"
                  value={replyForm}
                  onClick={() =>
                    setReplyForm(c.user?.username ? c.user?.username : "")
                  }
                >
                  <img src={replyIcon} alt="reply icon" className="reply-img" />
                  Reply
                </button>
              </div>
            </div>

            <p>{c.content}</p>
          </div>
          {replyForm === c.user?.username ? (
            <div>
              <AddComment currentUser={currentUser} />
            </div>
          ) : (
            <></>
          )}

          {c.replies?.length > 0 ? (
            <div
              className="layout-direction-row"
              style={{ margin: "-20px 0 0 0" }}
            >
              <div className="vertical-line"></div>

              <div>
                {c.replies?.map((r) => (
                  <div key={r.id}>
                    <div className="content-style">
                      <div className="layout-direction-row">
                        <div className="layout-direction-column score-style">
                          <button className="score-btn">+</button>
                          {r.score}
                          <button className="score-btn">-</button>
                        </div>

                        <img src={require(`${r.user?.image?.png}`)} />
                        <div>
                          <b>{r.user?.username}</b>
                        </div>
                        <div>
                          {r.user?.username ===
                          currentUser[0].currentUser.username ? (
                            <span className="current-user">you</span>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div style={{ padding: "0 10px" }}>{r.createdAt}</div>

                        <div className="reply-btn-layout">
                          <button
                            className="reply-btn"
                            value={replyForm}
                            onClick={() =>
                              setReplyForm(
                                r.user?.username ? r.user?.username : ""
                              )
                            }
                          >
                            <img
                              src={replyIcon}
                              alt="reply icon"
                              className="reply-img"
                            />
                            Reply
                          </button>
                        </div>
                      </div>
                      <p>
                        <span
                          style={{
                            color: "hsl(238, 40%, 52%)",
                            padding: " 0 5px 0 0",
                          }}
                        >
                          {r.replyingTo}@
                        </span>
                        {r.content}
                      </p>
                    </div>
                    {replyForm === r.user?.username ? (
                      <div>
                        <AddComment currentUser={currentUser} />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
      <AddComment currentUser={currentUser} />
    </div>
  );
};

export default AllComments;
