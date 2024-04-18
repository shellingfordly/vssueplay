import { expect, test, describe } from "vitest";
import GithubIssue from "./index";

const githubIssue = new GithubIssue({
  author: "string",
  repo: "string",
  clientId: "string",
  clientSecret: "string",
});

describe("github", () => {
  test("GithubIssue name:", () => {
    expect(githubIssue.name).toBe("GithubIssue");
  });
});
