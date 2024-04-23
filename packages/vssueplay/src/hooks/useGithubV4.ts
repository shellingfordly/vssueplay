import { reactive, ref } from "vue"
import { GithubV4, WebStorage, getQueryValue } from "@vssueplay/utils";
import type { GithubV4CommentInfo, GithubV4CommentReactionType, GithubV4UserInfo, GithubV4Config } from "@vssueplay/utils";

const storage = new WebStorage({
  storage: localStorage,
  isEncrypt: false,
  prefixKey: "VSSUEPLAY_"
});


const comments = ref<GithubV4CommentInfo[]>([]);
const githubV4 = new GithubV4();
const githubConfig = ref<Partial<GithubV4Config>>({})
const userInfo = ref<Partial<GithubV4UserInfo>>({});
const pageInfo = reactive<Partial<any>>({});
const commentTotalCount = ref(Infinity);
const quoteComment = ref<Partial<GithubV4CommentInfo>>({})
const loading = ref(false)

export function useGithubV4() {
  // const githubV4 = new GithubV4();
  // const comments = ref<GithubV4CommentInfo[]>([]);
  const { token } = storage.get("GITHUB_TOKEN")
  const isAuthed = !!token;
  const getAuthorizeUrl = githubV4.getAuthorizeUrl.bind(githubV4)

  async function setGithubConfig(config: GithubV4Config) {
    githubConfig.value = config;
    githubV4.setConfig({ ...config, accessToken: token });

    if (token) {
      init()
      return
    }

    const code = getQueryValue("code");
    if (code) {
      const token = await githubV4.getAccessToken(code);
      if (token) storage.set("GITHUB_TOKEN", { token });

      init()
    }
  }

  async function init() {
    await githubV4.getIssue(1);
    getUserInfo();
    initComments();
  }


  function sortComments(data: GithubV4CommentInfo[]) {
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

    const result = await githubV4.getComments({ sort: "last" });
    comments.value = sortComments(result.nodes);

    setPageInfo(result);
    loading.value = false
  }

  async function updateComments() {
    if (!isAuthed) return;

    loading.value = true

    const result = await githubV4.getComments(pageInfo);
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

    const result = await githubV4.createComment(value, id);
    if (result.error) {
      alert(result.error.message);
      return false;
    }

    return true;
  }

  async function reactionComment(
    commentId: string,
    content: GithubV4CommentReactionType
  ) {
    if (!isAuthed) return;

    githubV4.reactionComment(commentId, content);
  }

  async function getUserInfo() {
    if (!isAuthed) return;

    userInfo.value = (await githubV4.getUser()) || {};

    return userInfo.value;
  }

  async function deleteComment(commentId: string) {
    const result = await githubV4.deleteComment(commentId);

    if (result.error) {
      alert(result.error.message);
    }
    return result.data;
  }

  async function editorComment(commentId: string, content: string) {
    const result = await githubV4.editorComment(commentId, content);

    if (result.error) {
      alert(result.error.message);
    }

    return result.data;
  }

  function onUpdateComment(comment: GithubV4CommentInfo) {
    const index = comments.value.findIndex((item) => item.id == comment.id);
    if (index !== -1) {
      comments.value[index] = comment;
    }
  }

  function onQuoteComment(comment: GithubV4CommentInfo) {
    quoteComment.value = comment
  }

  function logout() {
    storage.clear();
    githubV4.clear();
    window.location.reload();
  }

  return {
    comments,
    commentTotalCount,
    userInfo,
    isAuthed,
    loading,
    githubConfig,
    getAuthorizeUrl,
    setGithubConfig,
    initComments,
    updateComments,
    createComment,
    reactionComment,
    getUserInfo,
    deleteComment,
    editorComment,
    logout,

    quoteComment,
    onUpdateComment,
    onQuoteComment
  };
};
