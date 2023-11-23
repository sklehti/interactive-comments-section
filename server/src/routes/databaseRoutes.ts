import express from "express";
// import usersCommentsService from "../services/usersCommentsService";
import { connection } from "../../config/db";
const databaseRouter = express.Router();

databaseRouter.get("/allUsers", (_req, res) => {
  const sql = "SELECT * FROM users";

  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

databaseRouter.get("/", (_req, res) => {
  const sql = "SELECT * FROM users u, comments c WHERE u.user_id = c.user_id";
  // const sql =
  //   "SELECT * FROM comments c, replies r WHERE c.comment_id = r.comment_id";

  connection.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

databaseRouter.get("/replies", (_req, res) => {
  const sql =
    "SELECT * FROM replies r, users u WHERE u.user_id = r.user_id ORDER BY CASE WHEN r.replyingToUserId > 0 THEN r.replyingToUserId ELSE r.id END ASC";
  connection.query(sql, (err, result) => {
    console.log(result);

    if (err) throw err;

    res.send(result);
  });
});

// TODO: jatka tästä!
databaseRouter.post("/", (req, res) => {
  // pitäisikö comment_id:llä päivättää myös commentin replies = 1
  const sql = "UPDATE comments SET replies = 1 WHERE comment_id = ?";
  const sql2 =
    "INSERT INTO replies (`content`, `createdAt`, `score`, `user_id`, `comment_id`, `replyingTo`, `replyingToUserId`) VALUES (?,?,?,?,?,?,?)";

  connection.query(sql, req.body.comment_id, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }

    connection.query(
      sql2,
      [
        req.body.content,
        req.body.createdAt,
        req.body.score,
        req.body.user_id,
        req.body.comment_id,
        req.body.replyingTo,
        req.body.replyingToUserId,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send(err);
          return;
        }
        res.send(result);
      }
    );
  });
});

// Delete comment from replies table
databaseRouter.delete("/replies/:id", (req, res) => {
  console.log(req.params.id, "test");

  const sql = "DELETE FROM replies WHERE id=?";

  connection.query(sql, [req.params.id], (err) => {
    if (err) throw err;

    res.send({ status: 200 });
  });
});

export default databaseRouter;
