import React, { useEffect, useState } from "react";
import { Comments, Replies, UserInfo } from "../types";
import AddComment from "./AddComment";
import replyIcon from "./images/icon-reply.svg";
import { formatDistance } from "date-fns";

type Props = {
  allComments: Comments[];
  currentUser: UserInfo | undefined;
  replies: Replies[];
  allUsers: UserInfo[] | undefined;
  setAllComments: React.Dispatch<React.SetStateAction<Comments[]>>;
  setReplies: React.Dispatch<React.SetStateAction<Replies[]>>;
};

const AllComments = ({
  allComments,
  currentUser,
  replies,
  allUsers,
  setAllComments,
  setReplies,
}: Props) => {
  const [replyForm, setReplyForm] = useState({ username: "", command_id: -1 });

  return (
    <div>
      {allComments.map((c) => (
        <div key={c.comment_id}>
          <div className="content-style">
            <div className="layout-direction-row">
              <div className="desktop-view">
                <div className="layout-direction-column score-style">
                  <button className="score-btn">+</button>
                  {c.score}
                  <button className="score-btn">-</button>
                </div>
              </div>

              <img src={require(`${c.image_png}`)} alt="dynamic" />
              <div>
                <b>{c.username}</b>
              </div>
              <div style={{ padding: "0 10px" }}></div>
              <div className="desktop-view">
                <AnswerToReply setReplyForm={setReplyForm} reply={c} />
              </div>
            </div>

            <p>{c.content}</p>
            <div className="mobile-view">
              <AnswerToReply setReplyForm={setReplyForm} reply={c} />
            </div>
          </div>
          {replyForm.command_id === c.comment_id &&
          replyForm.username === c.username ? (
            <div>
              <AddComment
                currentUser={currentUser}
                replyingTo={true}
                comment_id={c.comment_id}
                userName={c.username}
                setReplyForm={setReplyForm}
                setAllComments={setAllComments}
                setReplies={setReplies}
                replyingToUserId={0}
              />
            </div>
          ) : (
            <></>
          )}

          {replies.length > 0 && c.replies === 1 ? (
            <div className="layout-direction-row" style={{ margin: "-20px 0" }}>
              <div className="vertical-line-layout" style={{ width: "10%" }}>
                <div className="vertical-line"></div>
              </div>

              <div style={{ width: "90%" }}>
                {replies.map((r) => (
                  <div key={r.id}>
                    {c.comment_id === r.comment_id ? (
                      <div className="content-style">
                        <div className="layout-direction-row">
                          <div className="desktop-view">
                            <div className="layout-direction-column score-style">
                              <button className="score-btn">+</button>
                              {r.score}
                              <button className="score-btn">-</button>
                            </div>
                          </div>
                          <img src={require(`${r.image_png}`)} />
                          <div>
                            <b>{r.username}</b>
                          </div>
                          <div>
                            {currentUser?.username === r.username ? (
                              <span className="current-user">you</span>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div style={{ padding: "0 10px" }}>
                            <DaysFromWriting reply={c} />
                          </div>

                          <div className="desktop-view">
                            <AnswerToReply
                              setReplyForm={setReplyForm}
                              reply={r}
                            />
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
                        <div className="mobile-view">
                          <AnswerToReply
                            setReplyForm={setReplyForm}
                            reply={r}
                          />
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}

                    {replyForm.command_id === r.comment_id &&
                    replyForm.username === r.username &&
                    r.replyingTo === c.username ? (
                      <div>
                        <AddComment
                          currentUser={currentUser}
                          replyingTo={true}
                          comment_id={r.comment_id}
                          userName={r.username}
                          setReplyForm={setReplyForm}
                          setAllComments={setAllComments}
                          setReplies={setReplies}
                          replyingToUserId={r.id}
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
      {/* TODO: next doesn't work */}
      <div style={{ paddingTop: "20px" }}>
        <AddComment
          currentUser={currentUser}
          replyingTo={false}
          comment_id={undefined}
          userName={undefined}
          setReplyForm={setReplyForm}
          setAllComments={setAllComments}
          setReplies={setReplies}
          replyingToUserId={0}
        />
      </div>
    </div>
  );
};

type ReplyProps = {
  setReplyForm: React.Dispatch<
    React.SetStateAction<{ username: string; command_id: number }>
  >;
  reply: Replies | Comments;
};

const AnswerToReply = ({ setReplyForm, reply }: ReplyProps) => {
  return (
    <>
      <div className="mobile-view">
        <div className="layout-direction-row score-style">
          <button className="score-btn">+</button>
          {reply.score}
          <button className="score-btn">-</button>
        </div>
      </div>
      <div className="reply-btn-layout">
        <button
          className="reply-btn"
          // value={replyForm}
          onClick={() =>
            setReplyForm(
              reply?.username
                ? { username: reply.username, command_id: reply.comment_id }
                : { username: "", command_id: -1 }
            )
          }
        >
          <img src={replyIcon} alt="reply icon" className="reply-img" />
          Reply
        </button>
      </div>
    </>
  );
};

type DaysProps = {
  reply: Comments | Replies;
};

const DaysFromWriting = ({ reply }: DaysProps) => {
  const calculateTime = () => {
    const now = new Date();
    const createdAt = new Date(Number(reply.createdAt));

    return formatDistance(createdAt, now, { addSuffix: true });
  };

  const [time, setTime] = useState(calculateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <>{time}</>;
};

export default AllComments;
