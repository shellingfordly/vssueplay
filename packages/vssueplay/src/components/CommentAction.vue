<script setup lang="ts">
import { computed, ref, defineProps } from "vue";
import { useGithubV4 } from "../hooks/useGithubV4";
import { GithubV4CommentInfo } from "@vssueplay/utils";
import { useEventListener } from "@vueuse/core";

const props = defineProps<{ comment: GithubV4CommentInfo }>();
const {
  initComments,
  deleteComment,
  onQuoteComment,
  githubConfig,
} = useGithubV4();
const show = ref(false);
const isCommentAuthor = computed(
  () => githubConfig.value.author === props.comment.author.login
);

useEventListener(
  "click",
  () => {
    if (show.value) show.value = false;
  },
  false
);

function onClickShow(event: Event) {
  event.stopPropagation();

  show.value = !show.value;
}

function onCopyLink() {
  navigator.clipboard.writeText(props.comment.url);
}

async function onDeleteComment() {
  if (!window.confirm("Confirm to delete this comment ?")) return;
  const success = await deleteComment(props.comment.id);
  if (success) initComments();
}
</script>
<template>
  <div class="relative">
    <span
      class="hover-color-blue icon-[material-symbols--more-horiz]"
      @click="onClickShow"
    />

    <!-- Dropdown menu -->
    <div
      v-if="show"
      class="absolute left-[-8.5rem] w-40 z-10 text-sm border-default bg-white dark:bg-[#232323] divide-y dark:divide-gray-700 rounded-lg shadow"
    >
      <ul class="py-2">
        <li>
          <a href="#" class="block px-4 py-2 hover-bg-gray" @click="onCopyLink">
            Copy link
          </a>
        </li>
        <li>
          <a
            href="#"
            class="block px-4 py-2 hover-bg-gray"
            @click="onQuoteComment(comment)"
          >
            Quote reply
          </a>
        </li>
      </ul>
      <div class="py-2" v-if="isCommentAuthor">
        <a
          href="#"
          class="block px-4 py-2 text-sm hover-bg-gray"
          @click="$emit('editor')"
        >
          Edit
        </a>
        <a
          href="#"
          class="block px-4 py-2 text-sm text-red-400 hover:text-white hover:bg-red-400"
          @click="onDeleteComment"
        >
          Delete
        </a>
      </div>
    </div>
  </div>
</template>
