import express from "express";
import cors from "cors";
import usersCommentRouter from "./routes/usersComment";
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/comments", usersCommentRouter);

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
