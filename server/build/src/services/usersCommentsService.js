"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importDefault(require("../../data/data"));
const getEntries = () => {
    return data_1.default;
};
const addComment = () => {
    return null;
};
const findByUsername = (username) => {
    // DO THIS LATER!
    const entry = data_1.default.find((d) => d.currentUser.username === username);
    return entry;
};
exports.default = {
    getEntries,
    addComment,
    findByUsername,
};
