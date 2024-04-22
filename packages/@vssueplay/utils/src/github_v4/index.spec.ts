import { expect, test, describe, beforeEach } from "vitest";
import GithubIssue from "./index";
import MockAdapter from "axios-mock-adapter";

const config = {
  author: "shellingfordly",
  repo: "vssueplay",
  clientId: "client_id",
  clientSecret: "client_secret",
};

const githubIssue = new GithubIssue(config);

const mock = new MockAdapter(githubIssue.http);
const mockCode = "test_code";
const mockToken = "test_token";

describe("github", () => {
  test("GithubIssue name:", () => {
    expect(githubIssue.name).toBe("GithubIssue");
    expect(githubIssue.version).toBe("v4");
  });

  test("loginAuthorize", async () => {
    const githubAuthUrl = await githubIssue.getAuthorizeUrl();

    const url = "https://github.com/login/oauth/authorize";
    const redirect_uri = encodeURIComponent("http://localhost:3000/");
    const public_repo = encodeURIComponent("public_repo user:email");

    expect(githubAuthUrl).toBe(
      `${url}?client_id=${config.clientId}&redirect_uri=${redirect_uri}&scope=${public_repo}&state=${config.repo}`
    );
  });

  beforeEach(() => {
    mock.onPost(new RegExp("login/oauth/access_token")).reply(200, {
      access_token: mockToken,
    });
  });

  test("getAccessToken", async () => {
    const token = await githubIssue.getAccessToken(mockCode);

    expect(token).toBe(mockToken);
  });
});
