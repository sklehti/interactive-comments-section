"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewScore = exports.toNewComment = exports.toNewReplies = exports.parseDate = void 0;
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseContent = (content) => {
    if (!isString(content)) {
        throw new Error("Incorrect or missing type");
    }
    return content;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date: " + date);
    }
    return date;
};
exports.parseDate = parseDate;
const isNumber = (number) => {
    return typeof number === "number" || number instanceof Number;
};
const parseNumber = (value) => {
    if (!isNumber(value)) {
        throw new Error("Incorrect or missing date: " + value);
    }
    return value;
};
const toNewReplies = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect type or missing data.");
    }
    if ("content" in object &&
        "createdAt" in object &&
        "score" in object &&
        "username" in object &&
        "image_png" in object &&
        "image_webp" in object &&
        "comment_id" in object &&
        "user_id" in object &&
        "replyingTo" in object &&
        "replyingToUserId" in object) {
        const newReply = {
            content: parseContent(object.content),
            createdAt: parseContent(object.createdAt),
            score: parseNumber(object.score),
            username: parseContent(object.username),
            image_png: parseContent(object.image_png),
            image_webp: parseContent(object.image_webp),
            comment_id: parseNumber(object.comment_id),
            user_id: parseNumber(object.user_id),
            replyingTo: parseContent(object.replyingTo),
            replyingToUserId: parseNumber(object.replyingToUserId),
        };
        return newReply;
    }
    throw new Error("Incorrect data: some fields are missing.");
};
exports.toNewReplies = toNewReplies;
const toNewComment = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrct or missing type.");
    }
    if ("content" in object && "user_id" in object && "createdAt" in object) {
        const newComment = {
            content: parseContent(object.content),
            user_id: parseNumber(object.user_id),
            createdAt: parseContent(object.createdAt),
        };
        return newComment;
    }
    throw new Error("Incorrect data: some fields are missing.");
};
exports.toNewComment = toNewComment;
const toNewScore = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data.");
    }
    if ("comment_id" in object &&
        "user_id" in object &&
        "comment_type" in object) {
        const newScore = {
            comment_id: parseNumber(object.comment_id),
            user_id: parseNumber(object.user_id),
            comment_type: parseContent(object.comment_type),
        };
        return newScore;
    }
    throw new Error("Incorrect data: some fields are missing.");
};
exports.toNewScore = toNewScore;
