import express from "express";
import { pool } from "../../config/db";
import { parseDate, toNewScore, toNewReplies, toNewComment } from "../utils";
import { getIO } from "../socket";

const databaseRouter = express.Router();

databaseRouter.get("/allUsers", (_req, res) => {
  const sql = "SELECT * FROM users";

  pool.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }

    res.send(result);
  });
});

databaseRouter.get("/", (_req, res) => {
  const sql =
    "SELECT * FROM users u, comments c WHERE u.user_id = c.user_id ORDER BY score DESC";

  pool.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }

    const io = getIO();
    io.emit("allComments", result);
    res.send(result);
  });
});

databaseRouter.get("/replies", (_req, res) => {
  const sql =
    "SELECT * FROM replies r, users u WHERE u.user_id = r.user_id ORDER BY CASE WHEN r.replyingToUserId > 0 THEN r.replyingToUserId ELSE r.id END ASC";
  pool.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }

    const io = getIO();
    io.emit("allReplies", result);
    res.send(result);
  });
});

databaseRouter.post("/replies", (req, res) => {
  const sql = "UPDATE comments SET replies = 1 WHERE comment_id = ?";
  const sql2 =
    "INSERT INTO replies (`content`, `createdAt`, `score`, `user_id`, `comment_id`, `replyingTo`, `replyingToUserId`) VALUES (?,?,?,?,?,?,?)";

  pool.query(sql, req.body.comment_id, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }

    const newReply = toNewReplies(req.body);
    const newDate = parseDate(req.body.createdAt);
    const date2 = new Date(newDate);

    pool.query(
      sql2,
      [
        newReply.content,
        date2.valueOf(),
        newReply.score,
        newReply.user_id,
        newReply.comment_id,
        newReply.replyingTo,
        newReply.replyingToUserId,
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

// check if rigth score already exists
databaseRouter.post("/scores", (req, res) => {
  const sql =
    "SELECT * FROM scores WHERE comment_id=? AND user_id=? AND comment_type=?";

  pool.query(
    sql,
    [req.body.comment_id, req.body.user_id, req.body.comment_type],

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

databaseRouter.post("/newComment", (req, res) => {
  const sql =
    "INSERT INTO comments (`content`, `createdAt`, `score`, `user_id`, `replies`) VALUES (?,?,?,?,?)";

  const date2 = new Date(parseDate(req.body.createdAt));
  const newComment = toNewComment(req.body);

  pool.query(
    sql,
    [newComment.content, date2.valueOf(), 0, newComment.user_id, 0],
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

// add a point to the comment/replies table
databaseRouter.post("/addScore", (req, res) => {
  let sql;

  if (req.body.comment_type === "c") {
    sql = "UPDATE comments SET score = score + 1 WHERE comment_id=?";
  } else {
    sql = "UPDATE replies SET score = score + 1 WHERE id=?";
  }

  const sql2 =
    "INSERT INTO scores (`comment_id`, `user_id`, `comment_type`) VALUES (?,?,?)";

  pool.query(sql, [req.body.comment_id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }
    const newScore = toNewScore(req.body);

    pool.query(
      sql2,
      [newScore.comment_id, newScore.user_id, newScore.comment_type],
      (err, result3) => {
        if (err) {
          console.error(err);
          res.status(500).send(err);
          return;
        }
        res.send(result3);
      }
    );
  });
});

// remove a point to the comment/replies table
databaseRouter.put("/removeScore", (req, res) => {
  let sql;

  if (req.body.comment_type === "c") {
    sql = "UPDATE comments SET score = score - 1 WHERE comment_id=?";
  } else {
    sql = "UPDATE replies SET score = score - 1 WHERE id=?";
  }

  const sql2 =
    "DELETE FROM scores WHERE comment_id=? AND user_id=? AND comment_type=?";

  pool.query(sql, [req.body.comment_id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }

    const newScore = toNewScore(req.body);

    pool.query(
      sql2,
      [newScore.comment_id, newScore.user_id, newScore.comment_type],
      (err, result3) => {
        if (err) {
          console.error(err);
          res.status(500).send(err);
          return;
        }
        res.send(result3);
      }
    );
  });
});

// update comments content
databaseRouter.put("/updateComment", (req, res) => {
  const sql = "UPDATE comments SET content=? WHERE comment_id=?";

  pool.query(sql, [req.body.content, req.body.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }
    res.send(result);
  });
});

// update replies content
databaseRouter.put("/updateReplies", (req, res) => {
  const sql = "UPDATE replies SET content=? WHERE id=?";

  pool.query(sql, [req.body.content, req.body.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }

    res.send(result);
  });
});

// Delete comment from replies table
databaseRouter.delete("/replies/:id", (req, res) => {
  const sql = "DELETE FROM replies WHERE id=?";

  pool.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }

    res.send(result);
  });
});

// Delete comment from replies table
databaseRouter.delete("/comments/:id", (req, res) => {
  const sql = "DELETE FROM comments WHERE comment_id=?";

  pool.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }

    res.send(result);
  });
});

export default databaseRouter;
