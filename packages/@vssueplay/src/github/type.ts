export interface GithubPageInfo {
  endCursor: string;
  startCursor: string;
  sort: "last" | "first";
}

export interface GithubUserInfo {
  url: string; // user id
  login: string; // user name
  email: string; // user email
  avatarUrl: string; // user avatar
}

export type GithubCommentReactionType =
  | "THUMBS_UP"
  | "THUMBS_DOWN"
  | "HEART"
  | "EYES"
  | "LAUGH"
  | "HOORAY"
  | "CONFUSED"
  | "ROCKET";

export interface GithubCommentReactionGroup {
  content: GithubCommentReactionType;
  users: { totalCount: number };
}

export interface GithubCommentInfo {
  body: string; // comment content
  bodyHTML: string; // create time
  createdAt: string; // comment url
  id: string;
  url: string;
  author: GithubUserInfo;
  reactionGroups: GithubCommentReactionGroup[];
}

export interface GithubResponse {
  nodes: GithubCommentInfo[];
  pageInfo: GithubPageInfo;
  totalCount: number;
}
