import { reactive, ref, onMounted } from "vue"
import { GithubIssue, WebStorage, getQueryValue } from "@vssueplay/utils";
import type { GithubCommentInfo, GithubCommentReactionType, GithubUserInfo, GithubIssueConfig } from "@vssueplay/utils";

const storage = new WebStorage({
  storage: localStorage,
  isEncrypt: false,
  prefixKey: "VITE_"
});

export function useGithubIssue(config: GithubIssueConfig) {
  const _githubIssue = new GithubIssue(config);
  const comments = ref<GithubCommentInfo[]>([]);
  const pageInfo = reactive<Partial<any>>({});
  const commentTotalCount = ref(Infinity);
  const userInfo = ref<Partial<GithubUserInfo>>({});

  const quoteComment = ref<Partial<GithubCommentInfo>>({})
  const loading = ref(false)
  const { token } = storage.get("GITHUB_TOKEN")
  const isAuthed = !!token;

  onMounted(async () => {
    if (token) {
      _githubIssue.setConfig({ accessToken: token });

      init()
      return
    }

    const code = getQueryValue("code");
    if (code) {
      const token = await _githubIssue.getAccessToken(code);
      if (token) storage.set("GITHUB_TOKEN", { token });

      init()
    }
  })

  async function init() {
    await _githubIssue.getIssue(1);
    getUserInfo();
    initComments();
  }

  function getAuthorizeUrl() {
    return _githubIssue.getAuthorizeUrl();
  }

  function sortComments(data: GithubCommentInfo[]) {
    return data.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  function setPageInfo(result: any) {
    pageInfo.endCursor = result.pageInfo.endCursor;
    pageInfo.startCursor = result.pageInfo.startCursor;
    commentTotalCount.value = result.totalCount;
  }

  async function initComments() {
    if (!isAuthed) return;

    loading.value = true

    const result = await _githubIssue.getComments({ sort: "last" });
    comments.value = sortComments(result.nodes);

    setPageInfo(result);
    loading.value = false
  }

  async function updateComments() {
    if (!isAuthed) return;

    loading.value = true

    const result = await _githubIssue.getComments(pageInfo);
    const newComments = sortComments(result.nodes);
    comments.value = [...comments.value, ...newComments];

    setPageInfo(result);
    loading.value = false

  }

  async function createComment(content: string, id: string) {
    if (!isAuthed || !content) return;

    let value = content
    if (quoteComment.value.id) {
      const quoteBody = "@" + quoteComment.value.author?.login + "\n" + quoteComment.value.body?.split("\n").map(str => `> ${str}`).join("\n");
      value = quoteBody + "\n\n" + content;
    }

    const result = await _githubIssue.createComment(value, id);
    // if (result.errors && result.errors.length > 0) {
    //   const error = result.errors[0];

    //   alert(error.message);
    //   return false;
    // }

    // return true;
  }

  async function reactionComment(
    commentId: string,
    content: GithubCommentReactionType
  ) {
    if (!isAuthed) return;

    _githubIssue.reactionComment(commentId, content);
  }

  async function getReactionsComment() {
    // _githubComment.getCommentReactions("")
  }

  async function getUserInfo() {
    if (!isAuthed) return;

    userInfo.value = (await _githubIssue.getUser()) || {};

    return userInfo.value;
  }

  async function deleteComment(commentId: string) {
    const result = await _githubIssue.deleteComment(commentId);
    // if (result.error) {
    //   alert(result.error.message);
    // }
    // return result.data;
  }

  async function editorComment(commentId: string, content: string) {
    const result = await _githubIssue.editorComment(commentId, content);
    // if (result.error) {
    //   alert(result.error.message);
    // }

    // return result.data;
  }

  function onUpdateComment(comment: GithubCommentInfo) {
    const index = comments.value.findIndex((item) => item.id == comment.id);
    if (index !== -1) {
      comments.value[index] = comment;
    }
  }

  function onQuoteComment(comment: GithubCommentInfo) {
    quoteComment.value = comment
  }

  function logout() {
    _githubIssue.clear();
    window.location.reload();
  }

  return {
    comments,
    commentTotalCount,
    userInfo,
    isAuthed,
    loading,
    initComments,
    updateComments,
    createComment,
    reactionComment,
    getReactionsComment,
    getAuthorizeUrl,
    getUserInfo,
    deleteComment,
    editorComment,
    logout,

    quoteComment,
    onUpdateComment,
    onQuoteComment
  };
};
