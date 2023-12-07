import React, { useState } from "react";
import { Comments, Replies, UserInfo } from "../types";
import AddComment from "./AddComment";
import DaysFromWriting from "./DaysFromWriting";
import {
  getComments,
  getReplies,
  updateComment,
  updateReplies,
} from "../services/databaseServices";
import { parseError } from "./ErrorFunction";
import AnswerToReply from "./AnswerToReply";
import ScoreActions from "./ScoreActions";

type Props = {
  allComments: Comments[];
  currentUser: UserInfo | undefined;
  replies: Replies[];
  allUsers: UserInfo[] | undefined;
  setAllComments: React.Dispatch<React.SetStateAction<Comments[]>>;
  setReplies: React.Dispatch<React.SetStateAction<Replies[]>>;
  setDeleteCommentId: React.Dispatch<React.SetStateAction<number>>;
  setDeleteId: React.Dispatch<React.SetStateAction<number>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

const AllComments = ({
  allComments,
  currentUser,
  replies,
  allUsers,
  setAllComments,
  setReplies,
  setDeleteCommentId,
  setDeleteId,
  setErrorMessage,
}: Props) => {
  const [replyForm, setReplyForm] = useState({ username: "", command_id: -1 });
  const [editText, setEditText] = useState(-1);
  const [updateTextContent, setUpdateTextContent] = useState("");
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const handleUpdateContentSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    updateComment(updateTextContent, editText)
      .then(() => {
        getComments()
          .then((response) => {
            setAllComments(response);
          })
          .catch((error) => {
            setErrorMessage(parseError(error));
            setTimeout(() => {
              setErrorMessage("");
            }, 3000);
          });
      })
      .catch((error) => {
        setErrorMessage(parseError(error));
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      });

    setEditText(-1);
    setUpdateTextContent("");
    setHasStartedTyping(false);
  };

  const handleReplySubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    updateReplies(updateTextContent, editText).then(() => {
      getReplies()
        .then((response) => {
          setReplies(response);
        })
        .catch((error) => {
          setErrorMessage(parseError(error));
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        });
    });

    setEditText(-1);
    setUpdateTextContent("");
    setHasStartedTyping(false);
  };

  return (
    <div>
      {allComments.map((c) => (
        <div key={c.comment_id}>
          <div className="content-style">
            <div className="layout-direction-row">
              <div className="desktop-view">
                <ScoreActions
                  c={c}
                  currentUser={currentUser}
                  setAllComments={setAllComments}
                  setReplies={setReplies}
                  setErrorMessage={setErrorMessage}
                />
              </div>

              <div
                className="layout-direction-column"
                style={{ position: "relative", width: "100%" }}
              >
                <div className="layout-direction-row">
                  <img src={require(`${c.image_png}`)} alt="dynamic" />
                  <div>
                    <b>{c.username}</b>
                  </div>
                  <div>
                    {currentUser?.username === c.username ? (
                      <span className="current-user">you</span>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div style={{ padding: "0 10px" }}>
                    <DaysFromWriting reply={c} />
                  </div>

                  <div style={{ padding: "0 10px" }}></div>
                  <div className="desktop-view">
                    <AnswerToReply
                      setReplyForm={setReplyForm}
                      reply={c}
                      currentUser={currentUser}
                      setDeleteCommentId={setDeleteCommentId}
                      setDeleteId={setDeleteId}
                      setEditText={setEditText}
                      setAllComments={setAllComments}
                      setReplies={setReplies}
                      setErrorMessage={setErrorMessage}
                      setHasStartedTyping={setHasStartedTyping}
                    />
                  </div>
                </div>

                {editText === c.comment_id ? (
                  <form onSubmit={handleUpdateContentSubmit}>
                    <textarea
                      style={{ marginTop: "10px" }}
                      value={hasStartedTyping ? updateTextContent : c.content}
                      onChange={({ target }) => {
                        setUpdateTextContent(target.value);
                        setHasStartedTyping(true);
                      }}
                    >
                      {c.content}
                    </textarea>
                    <div className="update-btn-layout">
                      <button type="submit" className="send-btn">
                        update
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <p>{c.content}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mobile-view">
              <AnswerToReply
                setReplyForm={setReplyForm}
                reply={c}
                currentUser={currentUser}
                setDeleteCommentId={setDeleteCommentId}
                setDeleteId={setDeleteId}
                setEditText={setEditText}
                setAllComments={setAllComments}
                setReplies={setReplies}
                setErrorMessage={setErrorMessage}
                setHasStartedTyping={setHasStartedTyping}
              />
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
                setErrorMessage={setErrorMessage}
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
                            <ScoreActions
                              c={r}
                              currentUser={currentUser}
                              setAllComments={setAllComments}
                              setReplies={setReplies}
                              setErrorMessage={setErrorMessage}
                            />
                          </div>

                          <div
                            className="layout-direction-column"
                            style={{ position: "relative", width: "100%" }}
                          >
                            <div className="layout-direction-row">
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
                                <DaysFromWriting reply={r} />
                              </div>

                              <div className="desktop-view">
                                <AnswerToReply
                                  setReplyForm={setReplyForm}
                                  reply={r}
                                  currentUser={currentUser}
                                  setDeleteCommentId={setDeleteCommentId}
                                  setDeleteId={setDeleteId}
                                  setEditText={setEditText}
                                  setAllComments={setAllComments}
                                  setReplies={setReplies}
                                  setErrorMessage={setErrorMessage}
                                  setHasStartedTyping={setHasStartedTyping}
                                />
                              </div>
                            </div>

                            {editText === r.id ? (
                              <form onSubmit={handleReplySubmit}>
                                <textarea
                                  style={{ marginTop: "10px" }}
                                  value={
                                    hasStartedTyping
                                      ? updateTextContent
                                      : r.content
                                  }
                                  onChange={({ target }) => {
                                    setUpdateTextContent(target.value);
                                    setHasStartedTyping(true);
                                  }}
                                >
                                  {r.content}
                                </textarea>
                                <div className="update-btn-layout">
                                  <button type="submit" className="send-btn">
                                    update
                                  </button>
                                </div>
                              </form>
                            ) : (
                              <div>
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
                            )}
                          </div>
                        </div>

                        <div className="mobile-view">
                          <AnswerToReply
                            setReplyForm={setReplyForm}
                            reply={r}
                            currentUser={currentUser}
                            setDeleteCommentId={setDeleteCommentId}
                            setDeleteId={setDeleteId}
                            setEditText={setEditText}
                            setAllComments={setAllComments}
                            setReplies={setReplies}
                            setErrorMessage={setErrorMessage}
                            setHasStartedTyping={setHasStartedTyping}
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
                          setErrorMessage={setErrorMessage}
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
          setErrorMessage={setErrorMessage}
        />
      </div>
    </div>
  );
};

export default AllComments;
