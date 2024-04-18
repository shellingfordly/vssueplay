import { reactive, ref, computed, watch } from "vue"
import { GithubIssue } from "@vssueplay/utils";
import type { GithubCommentInfo, GithubCommentReactionType, GithubUserInfo, GithubIssueConfig } from "@vssueplay/utils";

export function useGithubIssue(config: GithubIssueConfig) {
  // const _githubCode = useRouteQuery("code", "");
  const _githubIssue = reactive(new GithubIssue(config));

  const comments = ref<GithubCommentInfo[]>([]);
  const pageInfo = reactive<Partial<any>>({});
  const commentTotalCount = ref(Infinity);
  const userInfo = ref<Partial<GithubUserInfo>>({});
  const isAuthed = computed(() => _githubIssue.isAuthed);
  const quoteComment = ref<Partial<GithubCommentInfo>>({})
  const loading = ref(false)

  // watch(
  //   _githubCode,
  //   async (code) => {
  //     if (code) {
  //       await _githubIssue.getAccessToken(code);
  //       window.location.href = "/"
  //     }
  //   },
  //   { immediate: true }
  // );

  watch(isAuthed, async () => {
    if (isAuthed.value) {
      await _githubIssue.getIssue(1);
      getUserInfo();
      initComments();
    }
  }, { immediate: true });

  // login github authorize
  function loginAuthorize() {
    console.log("loginAuthorize")
    return _githubIssue.loginAuthorize();
  }

  function getAccessToken(code: string) {
    return _githubIssue.getAccessToken(code);
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
    if (!isAuthed.value) return;

    loading.value = true

    const result = await _githubIssue.getComments({ sort: "last" });
    comments.value = sortComments(result.nodes);

    setPageInfo(result);
    loading.value = false
  }

  async function updateComments() {
    if (!isAuthed.value) return;

    loading.value = true

    const result = await _githubIssue.getComments(pageInfo);
    const newComments = sortComments(result.nodes);
    comments.value = [...comments.value, ...newComments];

    setPageInfo(result);
    loading.value = false

  }

  async function createComment(content: string, id: string) {
    if (!isAuthed.value || !content) return;

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
    if (!isAuthed.value) return;

    _githubIssue.reactionComment(commentId, content);
  }

  async function getReactionsComment() {
    // _githubComment.getCommentReactions("")
  }

  async function getUserInfo() {
    if (!isAuthed.value) return;

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
    loginAuthorize,
    getAccessToken,
    getUserInfo,
    deleteComment,
    editorComment,
    logout,

    quoteComment,
    onUpdateComment,
    onQuoteComment
  };
};
