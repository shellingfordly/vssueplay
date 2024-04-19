<script setup lang="ts">
import { GithubV4CommentInfo } from "@vssueplay/utils";
import { computed, ref, watch, watchEffect } from "vue";
import { useGithubV4 } from "../hooks/useGithubV4";
import { useEventListener } from "@vueuse/core";

const emit = defineEmits<{
  update: [comment: GithubV4CommentInfo];
  cancel: [void];
}>();
const props = defineProps<{ commentId?: string; commentBody?: string }>();
const isUpdateComment = computed(() => !!props.commentId);
const { quoteComment, createComment, editorComment, initComments, onUpdateComment, isAuthed } = useGithubV4();
const createLoading = ref(false);
const content = ref("");
const editorRef = ref<HTMLTextAreaElement | null>(null)
const isFocus = ref(false);
const btnDisabled = computed<boolean>(() => createLoading.value || !content.value.trim() || !isAuthed)

useEventListener(
  "click",
  () => {
    const focus = document.activeElement == editorRef.value;
    if (focus) onFocus()
    else isFocus.value = false;
  },
  false
);

watch(() => quoteComment, (comment) => {
  if (comment && comment.value.id) onFocus()
}, { immediate: true })

watchEffect(() => {
  if (props.commentBody) {
    content.value = props.commentBody;
  }
});

function onFocus() {
  if (editorRef.value) {
    editorRef.value.focus();
    isFocus.value = true;
  }
}

async function onCreateComment() {
  const success = await createComment(content.value, "");
  if (success) {
    await initComments();
  }
  content.value = "";
  quoteComment.value = {};
}

async function updateComment() {
  if (props?.commentId) {
    const data = await editorComment(props?.commentId, content.value);

    if (data) {
      emit("update", data);
      onUpdateComment(data);
    }
  }
}

async function onEditComment() {
  createLoading.value = true;

  if (isUpdateComment.value) updateComment();
  else onCreateComment()

  createLoading.value = false;
}
</script>
<template>
  <div
    class="flex flex-col w-full box-border p-2 border-default resize-none"
    :class="isFocus && 'border-2 border-blue-200 dark:b-blue-800'"
    @click="onFocus"
  >
    <div
      v-if="quoteComment.id"
      class="markdown-body mb-2 bg-gray-100 p-2 rounded"
      v-html="quoteComment.bodyHTML"
    />
    <textarea
      ref="editorRef"
      v-model="content"
      class="box-border w-full min-h-20 resize-none border-0 outline-0"
      @focus="isFocus = true"
    />
  </div>
  <div class="flex items-center justify-end p-2 space-x-2">
    <button
      v-if="isUpdateComment"
      class="btn bg-red-300 dark:bg-red-800 hover:bg-red-200 hover:dark:bg-red-900"
      @click="$emit('cancel')"
    >
      Cancel
    </button>
    <button
      class="btn"
      :class="[btnDisabled && 'cursor-not-allowed!']"
      :disabled="btnDisabled"
      @click="onEditComment"
      title="post comment"
    >
      <span v-if="createLoading" i-line-md:loading-alt-loop />
      <span>{{ isUpdateComment ? "Update Comment" : "Comment" }}</span>
    </button>
  </div>
</template>
