// NOTE! Update server side types.ts
export interface AllUsers {
  id?: number;
  comments: Comments[];
  currentUser: CurrentUser;
}

export interface CurrentUser {
  image: Image;
  username: string;
}

export interface Comment {
  content: string;
  createdAt: Date;
  user_id: number;
}

export interface Comments {
  content: string;
  createdAt: Date;
  score?: number;
  username: string;
  image_png: string;
  image_webp: string;
  comment_id: number;
  replies: number;
}

export interface UserInfo {
  username: string;
  image_png: string;
  image_webp: string;
  admin: number;
  user_id: number;
}

export interface User {
  username: string;
  image?: Image;
}
export interface Image {
  png: string;
  webp: string;
}

export interface Replies {
  id?: number;
  content?: string;
  score?: number;
  createdAt?: Date;
  user_id: number;
  replyingTo: string;
  comment_id: number;
  username: string;
  image_png: string;
  replyingToUserId: number | undefined;
}

export interface Score {
  id?: number;
  comment_id: number;
  user_id: number;
  comment_type: string;
}
