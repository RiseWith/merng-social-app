export interface IPost {
  id: string;
  body: string;
  username: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
}

export interface IComment {
  id: string;
  body: string;
  username: string;
  createdAt: string;
}

export interface ILike {
  id: string;
  username: string;
  createdAt: string;
}