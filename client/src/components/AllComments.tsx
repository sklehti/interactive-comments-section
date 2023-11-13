import React, { useState } from "react";
import { Comments, Replies, UserInfo } from "../types";
import AddComment from "./AddComment";
import replyIcon from "./images/icon-reply.svg";

type Props = {
  allComments: Comments[];
  // currentUser: AllUsers[];
  currentUser: UserInfo | undefined;
  replies: Replies[];
  allUsers: UserInfo[] | undefined;
};

const AllComments = ({
  allComments,
  currentUser,
  replies,
  allUsers,
}: Props) => {
  const [replyForm, setReplyForm] = useState("");

  return (
    <div>
      {allComments.map((c) => (
        <div key={c.comment_id}>
          <div className="content-style">
            <div className="layout-direction-row">
              <div className="layout-direction-column score-style">
                <button className="score-btn">+</button>
                {c.score}
                <button className="score-btn">-</button>
              </div>

              {/* <img src={require(`${c.user?.image?.png}`)} alt="dynamic" /> */}
              <img src={require(`${c.image_png}`)} alt="dynamic" />
              <div>
                <b>{c.username}</b>
              </div>
              <div style={{ padding: "0 10px" }}>{c.createdAt}</div>
              <div className="reply-btn-layout">
                <button
                  className="reply-btn"
                  value={replyForm}
                  onClick={() => setReplyForm(c.username ? c.username : "")}
                >
                  <img src={replyIcon} alt="reply icon" className="reply-img" />
                  Reply
                </button>
              </div>
            </div>

            <p>{c.content}</p>
          </div>
          {replyForm === c.username ? (
            <div>
              <AddComment currentUser={currentUser} replyingTo={true} />
            </div>
          ) : (
            <></>
          )}

          {/* {c.replies !== undefined && c.replies?.length > 0 ? ( */}
          {replies.length > 0 && c.replies === 1 ? (
            <div
              className="layout-direction-row"
              style={{ margin: "-20px 0 0 0" }}
            >
              <div className="vertical-line"></div>

              <div>
                {replies?.map((r) => (
                  <div key={r.id}>
                    {c.comment_id === r.comment_id ? (
                      <div className="content-style">
                        <div className="layout-direction-row">
                          <div className="layout-direction-column score-style">
                            <button className="score-btn">+</button>
                            {r.score}
                            <button className="score-btn">-</button>
                          </div>

                          <img src={require(`${r.image_png}`)} />
                          <div>
                            <b>{r.username}</b>
                          </div>
                          <div>
                            {/* { currentUser[0].currentUser.username = r.user?.username ? ( 
                            <span className="current-user">you</span>
                          ) : (
                            <></>
                          )} */}
                            {currentUser?.username === r.user?.username ? (
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
                                setReplyForm(r?.username ? r.username : "")
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
                    ) : (
                      <></>
                    )}
                    {replyForm === r?.username ? (
                      <div>
                        <AddComment
                          currentUser={currentUser}
                          replyingTo={true}
                        />
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
      <AddComment currentUser={currentUser} replyingTo={false} />
    </div>
  );
};

export default AllComments;
