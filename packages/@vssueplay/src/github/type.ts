interface GithubPageInfo {
  endCursor: string;
  startCursor: string;
  sort: "last" | "first";
}

interface GithubUserInfo {
  url: string; // user id
  login: string; // user name
  email: string; // user email
  avatarUrl: string; // user avatar
}

type GithubCommentReactionType =
  | "THUMBS_UP"
  | "THUMBS_DOWN"
  | "HEART"
  | "EYES"
  | "LAUGH"
  | "HOORAY"
  | "CONFUSED"
  | "ROCKET";

interface GithubCommentReactionGroup {
  content: GithubCommentReactionType;
  users: { totalCount: number };
}

interface GithubCommentInfo {
  body: string; // comment content
  bodyHTML: string; // create time
  createdAt: string; // comment url
  id: string;
  url: string;
  author: GithubUserInfo;
  reactionGroups: GithubCommentReactionGroup[];
}

interface GithubResponse {
  nodes: GithubCommentInfo[];
  pageInfo: GithubPageInfo;
  totalCount: number;
}
