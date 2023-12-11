import express from "express";
import cors from "cors";
import databaseRouter from "./routes/databaseRoutes";
import { createServer } from "http";
import { Server as IOServer, Socket } from "socket.io";

import { setIO } from "./socket";

const app = express();
app.use(express.json());
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://interactive-comments-section-4237c7a4f001.herokuapp.com/",
  })
);
app.use(express.static("./build"));

const httpServer = createServer(app);
const io: IOServer = new IOServer(httpServer, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "https://interactive-comments-section-4237c7a4f001.herokuapp.com/",
    methods: ["GET", "POST"],
  },
});

setIO(io);

io.on("connection", (socket: Socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// const PORT = 3001;
const PORT = process.env.PORT || 3001;

// get data from database
app.use("/api/database", databaseRouter);

httpServer.listen(PORT, () => {
  console.log(`Server running on: port ${PORT}`);
});

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
