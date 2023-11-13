"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usersComment_1 = __importDefault(require("./routes/usersComment"));
const databaseRoutes_1 = __importDefault(require("./routes/databaseRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = 3001;
app.get("/ping", (_req, res) => {
    console.log("someone pinged here");
    res.send("pong");
});
// get data from json file
app.use("/api/comments", usersComment_1.default);
// get data from database
app.use("/api/database", databaseRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});
