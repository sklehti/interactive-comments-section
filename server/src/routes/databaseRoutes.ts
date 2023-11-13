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
  const sql = "SELECT * FROM replies r, users u WHERE u.user_id = r.user_id";

  connection.query(sql, (err, result) => {
    if (err) throw err;

    console.log(result);

    res.send(result);
  });
});

export default databaseRouter;
