import { formatUrl } from "../common";
import { GithubApiQuery } from "./query";
import { GithubV4CommentReactionType, GithubV4PageInfo, GithubV4Response, GithubV4UserInfo } from "./type";

export interface GithubV4Config {
  author: string;
  repo: string;
  clientId: string;
  clientSecret: string;
  accessToken?: string;
}

export default class GithubV4 {
  public name = "GithubIssue";
  public version = "v4";
  private issueNodeId = "";
  private author = "";
  private repo = "";
  private clientId = "";
  private clientSecret = "";
  private accessToken = "";

  private api = {
    auth: "https://github.com/login/oauth/authorize",
    token: "https://github.com/login/oauth/access_token",
    graphql: "https://api.github.com/graphql",
    proxy: "https://cors-anywhere.azm.workers.dev/",
  };

  constructor(config?: GithubV4Config) {
    this.setConfig(config);
  }

  get isAuthed() {
    return !!this.accessToken;
  }

  get apiQuery() {
    return GithubApiQuery;
  }

  get http() {
    return this.fetch
  }

  private fetch(url: string, config?: RequestInit) {
    const token = this.accessToken;

    function _fetch<T = any>(_url: string, _config?: RequestInit): Promise<T> {
      return new Promise((resolve, reject) => {
        fetch(_url, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: "token " + token
          },
          ..._config,
        }).then((fetchResponse => {
          resolve(fetchResponse as T)
        })).catch(fetchError => {
          reject(fetchError)
        });
      })
    }

    const post = <T = any>(body: any) => _fetch<T>(url, {
      ...config,
      method: "POST",
      body: JSON.stringify(body)
    })
    const get = <T = any>(body: any) => _fetch<T>(formatUrl(url, body), {
      ...config,
      method: "GET"
    })
    return {
      post, get
    }
  }

  setConfig(config: Partial<GithubV4Config> = {}) {
    if (config.author) this.author = config.author;
    if (config.repo) this.repo = config.repo;
    if (config.clientId) this.clientId = config.clientId;
    if (config.clientSecret) this.clientSecret = config.clientSecret;
    if (config.accessToken) this.accessToken = config.accessToken;
  }

  clear() {
    this.accessToken = "";
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
  getAuthorizeUrl() {
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

      const result: any = await this.fetch(url, {
        headers: {
          Accept: "application/json",
        },
      }).post(
        {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code,
          redirect_uri: window.location.href,
        }
      );

      this.accessToken = result.access_token;
      return result.access_token as string;
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
    const { data } = await this.fetch(this.api.graphql).post({
      query: this.apiQuery.getUserQuery(),
    });

    return data.viewer as GithubV4UserInfo;
  }

  async getIssue(issueId: number) {
    const owner = this.author;
    const repo = this.repo;
    const { data } = await this.fetch(this.api.graphql).post({
      query: this.apiQuery.getIssueQuery({
        owner,
        repo,
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
  async getComments(pageInfo: Partial<GithubV4PageInfo>) {
    const { data } = await this.fetch(this.api.graphql).post({
      variables: {
        owner: this.author,
        repo: this.repo,
        issueId: 1,
        perPage: 10,
      },
      query: this.apiQuery.getCommentsQuery(pageInfo),
    });

    return data.repository.issue.comments as GithubV4Response;
  }

  /**
   * Create a new comment
   *
   * @see https://developer.github.com/v4/mutation/addcomment/
   * @see https://developer.github.com/v4/input_object/addcommentinput/
   */
  async createComment(content: string, id: string) {
    const issueNodeId = this.issueNodeId || id;

    const result: any = this.fetch(this.api.graphql).post({
      variables: {
        issueNodeId,
        content,
      },
      query: this.apiQuery.createCommentQuery(),
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
   * Edit a comment
   *
   * @see https://developer.github.com/v4/mutation/updateissuecomment/
   * @see https://developer.github.com/v4/input_object/updateissuecommentinput/
   */
  async editorComment(commentId: string, content: string) {
    const result: any = await this.fetch(this.api.graphql).post({
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
    const result: any = await this.fetch(this.api.graphql).post({
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
  async reactionComment(commentId: string, content: GithubV4CommentReactionType) {
    return this.fetch(this.api.graphql).post({
      variables: {
        commentId,
        content,
      },
      query: this.apiQuery.reactionCommentQuery(),
    });
  }

  async getCommentReactions(issueId: string) {
    return this.fetch(this.api.graphql).post({
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
