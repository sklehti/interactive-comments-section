"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import usersCommentsService from "../services/usersCommentsService";
const db_1 = require("../../config/db");
const databaseRouter = express_1.default.Router();
databaseRouter.get("/allUsers", (_req, res) => {
    const sql = "SELECT * FROM users";
    db_1.connection.query(sql, (err, result) => {
        if (err)
            throw err;
        res.send(result);
    });
});
databaseRouter.get("/", (_req, res) => {
    const sql = "SELECT * FROM users u, comments c WHERE u.user_id = c.user_id";
    // const sql =
    //   "SELECT * FROM comments c, replies r WHERE c.comment_id = r.comment_id";
    db_1.connection.query(sql, (err, result) => {
        if (err)
            throw err;
        res.send(result);
    });
});
databaseRouter.get("/replies", (_req, res) => {
    const sql = "SELECT * FROM replies r, users u WHERE u.user_id = r.user_id";
    db_1.connection.query(sql, (err, result) => {
        if (err)
            throw err;
        console.log(result);
        res.send(result);
    });
});
exports.default = databaseRouter;
