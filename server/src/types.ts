// export interface AllUsers {
//   id?: number;
//   comments: Comments[];
//   currentUser: CurrentUser;
// }

// export interface CurrentUser {
//   image: Image;
//   username: string;
// }

// export interface Comments {
//   id: number;
//   content: string;
//   createdAt: string;
//   score?: number;
//   user?: User;
//   replies: Replies[];
// }

// export interface User {
//   username: string;
//   image?: Image;
// }

// export interface Image {
//   png: string;
//   webp: string;
// }

// export interface Replies {
//   id: number;
//   content?: string;
//   score?: number;
//   createdAt?: string;
//   user?: User;
//   replyingTo: string;
// }

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
  createdAt: string;
  user_id: number;
}

export interface Comments {
  content: string;
  createdAt: string;
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
  createdAt?: string;
  user_id: number;
  replyingTo: string;
  comment_id: number;
  username: string;
  image_png: string;
  image_webp: string;
  replyingToUserId?: number;
}

export interface Score {
  id?: number;
  comment_id: number;
  user_id: number;
  comment_type: string;
}
