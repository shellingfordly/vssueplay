<script setup lang="ts">
import { computed, ref } from "vue";
import { useGithubV4 } from "../hooks/useGithubV4";
import {
  GithubV4CommentReactionGroup,
  GithubV4CommentReactionType,
} from "@vssueplay/utils";
import { useEventListener } from "@vueuse/core";

const props = defineProps<{
  commentId: string;
  reactionGroups: GithubV4CommentReactionGroup[];
}>();

const commentReactionIcon: Record<GithubV4CommentReactionType, string> = {
  THUMBS_UP: "👍",
  THUMBS_DOWN: "👎",
  HEART: "❤️",
  EYES: "👀",
  LAUGH: "😄",
  HOORAY: "🎉",
  CONFUSED: "😕",
  ROCKET: "🚀",
};
const show = ref(false);
const { reactionComment, initComments } = useGithubV4();
const reactionGroups = computed(() =>
  props.reactionGroups.filter((item) => item.users.totalCount > 0)
);

function onClickShow(event: Event) {
  event.stopPropagation();

  show.value = !show.value;
}

async function onClickReaction(
  event: Event,
  reaction: GithubV4CommentReactionType
) {
  event.stopPropagation();

  await reactionComment(props.commentId, reaction);
  await initComments();

  show.value = !show.value;
}

useEventListener(
  "click",
  () => {
    if (show.value) show.value = false;
  },
  false
);
</script>

<template>
  <div class="relative">
    <div
      v-show="show"
      class="flex absolute top-[-3rem] left-3 p-2 space-x-1 shadow-2xl bg-white dark:bg-gray-900 border-default"
    >
      <div
        class="hover:bg-gray-200 hover:dark:bg-gray-600 cursor-pointer py-1 px-2 rounded"
        v-for="(icon, key) in commentReactionIcon"
        @click="(e) => onClickReaction(e, key)"
      >
        {{ icon }}
      </div>
    </div>
    <div class="flex items-center p-3">
      <div
        class="flex items-center justify-center w-5 h-5 mb-1 border border-gray-400 rounded-full cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700"
        @click="onClickShow"
      >
        <span
          class="text-gray-400 icon-[material-symbols--sentiment-satisfied-outline-rounded]"
        />
      </div>
      <div class="flex flex-wrap space-x-2 ml-2">
        <div
          class="px-2 mb-1 rounded-4 cursor-pointer border-default hover:border-gray-400 hover:dark:border-gray-400 rounded-full"
          v-for="item in reactionGroups"
        >
          <span class="mr-2">{{ commentReactionIcon[item.content] }}</span>
          <span>{{ item.users.totalCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
