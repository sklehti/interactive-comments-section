"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersCommentsService_1 = __importDefault(require("../services/usersCommentsService"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(usersCommentsService_1.default.getEntries());
});
router.post("/", (_req, res) => {
    res.send("Saving a data");
});
exports.default = router;
