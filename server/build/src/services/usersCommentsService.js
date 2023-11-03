"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importDefault(require("../../data/data"));
const getEntries = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data_1.default;
};
const addComment = () => {
    return null;
};
exports.default = {
    getEntries,
    addComment,
};
