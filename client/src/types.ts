// NOTE! Maybe we don't need all these interfaces
export interface AllUsers {
  id?: number;
  comments: Comments[];
  currentUser: CurrentUser;
}

export interface CurrentUser {
  image: Image;
  username: string;
}

export interface Comments {
  content: string;
  createdAt: string;
  score?: number;
  // user?: User;
  username: string;
  image_png: string;
  image_webp: string;
  // replies?: Replies[];
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
  id: number;
  content?: string;
  score?: number;
  createdAt?: string;
  user?: User; // TODO: muuta tämä sellaiseksi joka tuo nimen ja kuvan!
  // user_id: number;
  replyingTo: string;
  comment_id: number;
  username: string;
  image_png: string;
}
