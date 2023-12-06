import { Comment, Replies, Score } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseContent = (content: unknown): string => {
  if (!isString(content)) {
    throw new Error("Incorrect or missing type");
  }
  return content;
};

const parseDate = (date: unknown): Date => {
  if (!(date instanceof Date)) {
    throw new Error("Incorrect or missing date: " + date);
  }

  return date;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const parseNumber = (value: unknown): number => {
  if (!isNumber(value)) {
    throw new Error("Incorrect or missing date: " + value);
  }

  return value;
};

export const toNewReplies = (object: unknown): Replies => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect type or missing data.");
  }

  if (
    "content" in object &&
    "createdAt" in object &&
    "score" in object &&
    "username" in object &&
    "image_png" in object &&
    "image_webp" in object &&
    "comment_id" in object &&
    "user_id" in object &&
    "replyingTo" in object &&
    "replyingToUserId" in object
  ) {
    const newReply: Replies = {
      content: parseContent(object.content),
      createdAt: parseDate(object.createdAt),
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

export const toNewComment = (object: unknown): Comment => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrct or missing type.");
  }

  if ("content" in object && "user_id" in object && "createdAt" in object) {
    const newComment: Comment = {
      content: parseContent(object.content),
      user_id: parseNumber(object.user_id),
      createdAt: parseDate(object.createdAt),
    };

    return newComment;
  }
  throw new Error("Incorrect data: some fields are missing.");
};

export const toNewScore = (object: unknown): Score => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data.");
  }

  if (
    "comment_id" in object &&
    "user_id" in object &&
    "comment_type" in object
  ) {
    const newScore: Score = {
      comment_id: parseNumber(object.comment_id),
      user_id: parseNumber(object.user_id),
      comment_type: parseContent(object.comment_type),
    };

    return newScore;
  }
  throw new Error("Incorrect data: some fields are missing.");
};
