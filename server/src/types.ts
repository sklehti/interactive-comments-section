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
  id: number;
  content: string;
  createdAt: string;
  score?: number;
  user?: User;
  replies: Replies[];
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
  user?: User;
  replyingTo: string;
}
