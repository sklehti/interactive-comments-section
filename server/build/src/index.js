"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const databaseRoutes_1 = __importDefault(require("./routes/databaseRoutes"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const socket_1 = require("./socket");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    // origin: "http://localhost:3000",
    origin: "https://interactive-comments-section-4237c7a4f001.herokuapp.com/",
}));
app.use(express_1.default.static("./build"));
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        // origin: "http://localhost:3000",
        origin: "https://interactive-comments-section-4237c7a4f001.herokuapp.com/",
        methods: ["GET", "POST"],
    },
});
(0, socket_1.setIO)(io);
io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});
// const PORT = 3001;
const PORT = process.env.PORT || 3001;
// get data from database
app.use("/api/database", databaseRoutes_1.default);
httpServer.listen(PORT, () => {
    console.log(`Server running on: port ${PORT}`);
});
const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};
exports.getIO = getIO;
