export interface GithubV4PageInfo {
  endCursor: string;
  startCursor: string;
  sort: "last" | "first";
}

export interface GithubV4UserInfo {
  url: string; // user id
  login: string; // user name
  email: string; // user email
  avatarUrl: string; // user avatar
}

export type GithubV4CommentReactionType =
  | "THUMBS_UP"
  | "THUMBS_DOWN"
  | "HEART"
  | "EYES"
  | "LAUGH"
  | "HOORAY"
  | "CONFUSED"
  | "ROCKET";

export interface GithubV4CommentReactionGroup {
  content: GithubV4CommentReactionType;
  users: { totalCount: number };
}

export interface GithubV4CommentInfo {
  body: string; // comment content
  bodyHTML: string; // create time
  createdAt: string; // comment url
  id: string;
  url: string;
  author: GithubV4UserInfo;
  reactionGroups: GithubV4CommentReactionGroup[];
}

export interface GithubV4Response {
  nodes: GithubV4CommentInfo[];
  pageInfo: GithubV4PageInfo;
  totalCount: number;
}
