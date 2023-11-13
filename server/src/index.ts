import express from "express";
import cors from "cors";
import usersCommentRouter from "./routes/usersComment";
import databaseRouter from "./routes/databaseRoutes";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

// get data from json file
app.use("/api/comments", usersCommentRouter);

// get data from database
app.use("/api/database", databaseRouter);

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
