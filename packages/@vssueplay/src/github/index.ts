import { formatUrl } from "../utils";
import { createFetch } from "../fetch";
import { GithubApiQuery } from "./query";

interface GithubConfig {
  author: string;
  repo: string;
  clientId: string;
  clientSecret: string;
}

export default class GithubIssue {
  public name = "GithubIssue";
  public version = 0;
  private issueNodeId = "";
  private author = "";
  private repo = "";
  private clientId = "";
  private clientSecret = "";
  private token = "";

  private api = {
    auth: "https://github.com/login/oauth/authorize",
    token: "https://github.com/login/oauth/access_token",
    graphql: "https://api.github.com/graphql",
    proxy: "https://cors-anywhere.azm.workers.dev/",
  };

  constructor(config: GithubConfig) {
    this.author = config.author;
    this.repo = config.repo;
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
  }

  get isAuthed() {
    return !!this.token;
  }

  get fetch() {
    return createFetch();
  }

  get apiQuery() {
    return GithubApiQuery;
  }

  clear() {
    this.token = "";
    this.issueNodeId = "";
    this.author = "";
    this.repo = "";
    this.clientId = "";
    this.clientSecret = "";
  }

  /**
   * Redirect to the authorization page of platform.
   *
   * @see https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#1-request-a-users-github-identity
   */
  async loginAuthorize() {
    return formatUrl(this.api.auth, {
      client_id: this.clientId,
      redirect_uri: window.location.href,
      scope: "public_repo user:email",
      state: this.repo,
    });
  }

  /**
   * Get user access token via `code`
   *
   * @see https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#2-users-are-redirected-back-to-your-site-by-github
   */
  async getAccessToken(code: string) {
    /**
     * access_token api does not support cors
     * @see https://github.com/isaacs/github/issues/330
     */

    try {
      const url = this.api.proxy + this.api.token;

      const data = await this.fetch.post(
        url,
        {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code,
          redirect_uri: window.location.href,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      return data.access_token;
    } catch (error) {
      console.error("[GithubIssue getAccessToken]: ", error);
    }
    return "";
  }

  /**
   * Get the logged-in user with access token.
   *
   * @see https://developer.github.com/v4/query/ viewer
   * @see https://developer.github.com/v4/object/user/
   */
  async getUser() {
    const { data } = await this.fetch.post(this.api.graphql, {
      query: this.apiQuery.getUserQuery(),
    });

    return data.viewer as GithubUserInfo;
  }

  async getIssue(issueId: number) {
    const { data } = await this.fetch.post(this.api.graphql, {
      query: this.apiQuery.getIssueQuery({
        owner: this.author,
        repo: this.repo,
        issueId,
      }),
    });

    this.issueNodeId = data.repository.issue.id;
  }

  /**
   * Get comments of this page according to the issue id
   *
   * @see https://developer.github.com/v4/object/issuecommentconnection/
   */
  async getComments(pageInfo: Partial<GithubPageInfo>) {
    const { data } = await this.fetch.post(this.api.graphql, {
      variables: {
        owner: this.author,
        repo: this.repo,
        issueId: 1,
        perPage: 10,
      },
      query: this.apiQuery.getCommentsQuery(pageInfo),
    });

    return data.repository.issue.comments as GithubResponse;
  }

  /**
   * Create a new comment
   *
   * @see https://developer.github.com/v4/mutation/addcomment/
   * @see https://developer.github.com/v4/input_object/addcommentinput/
   */
  async createComment(content: string, id: string) {
    const issueNodeId = this.issueNodeId || id;

    return this.fetch.post(this.api.graphql, {
      variables: {
        issueNodeId,
        content,
      },
      query: this.apiQuery.createCommentQuery(),
    });
  }

  /**
   * Edit a comment
   *
   * @see https://developer.github.com/v4/mutation/updateissuecomment/
   * @see https://developer.github.com/v4/input_object/updateissuecommentinput/
   */
  async editorComment(commentId: string, content: string) {
    const result = await this.fetch.post(this.api.graphql, {
      variables: {
        commentId,
        content,
      },
      query: this.apiQuery.editorCommentQuery(),
    });

    if (result.errors && result.errors.length) {
      return {
        data: null,
        error: {
          message: result.errors[0].message,
          type: result.errors[0].type,
        },
      };
    } else {
      return {
        data: result.data.updateIssueComment.issueComment,
        error: null,
      };
    }
  }

  /**
   * Delete a comment
   *
   * @see https://developer.github.com/v4/mutation/deleteissuecomment/
   */
  async deleteComment(commentId: string) {
    const result = await this.fetch.post(this.api.graphql, {
      variables: {
        commentId,
      },
      query: this.apiQuery.deleteCommentQuery(),
    });

    if (result.errors && result.errors.length) {
      return {
        data: null,
        error: {
          message: result.errors[0].message,
          type: result.errors[0].type,
        },
      };
    } else {
      return {
        data: result.data,
        error: null,
      };
    }
  }

  /**
   * reaction: ❤️ 👍 👎
   */
  async reactionComment(commentId: string, content: GithubCommentReactionType) {
    return this.fetch.post(this.api.graphql, {
      variables: {
        commentId,
        content,
      },
      query: this.apiQuery.reactionCommentQuery(),
    });
  }

  async getCommentReactions(issueId: string) {
    this.fetch.post(this.api.graphql, {
      variables: {
        owner: this.author,
        repo: this.repo,
        issueId,
        perPage: 100,
      },
      query: this.apiQuery.getReactionsQuery(),
    });
  }
}
