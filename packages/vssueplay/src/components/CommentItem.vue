<script setup lang="ts">
import { GithubV4CommentInfo } from "@vssueplay/utils";
import { ref } from "vue";

const props = defineProps<{ comment: GithubV4CommentInfo }>();
const isEditMode = ref(false);

function onGoGithubUserPage() {
  window.open(props.comment.author.url);
}
</script>

<template>
  <div class="flex mb-5">
    <img class="cursor-pointer mr-5 w-10 h-10 rounded-full" :src="comment.author.avatarUrl" :alt="comment.author.login"
      @click="onGoGithubUserPage" />

    <div class="comment border-default">
      <div class="flex items-center justify-between p-2 border-b b-gray">
        <div>
          <a class="a-blue mr-2" :href="comment.author.url" target="_blank">
            {{ comment.author.login }}
          </a>
          <span class="font-size-3 c-gray"> commented on Jan 13, 2019 </span>
        </div>
        <!-- <CommentAction :comment="comment" @editor="isEditMode = true" /> -->
      </div>
      <div class="p-4">
        <div v-if="!isEditMode" class="markdown-body" v-html="comment.bodyHTML"></div>
        <!-- <CommentEditor v-if="isEditMode" :comment-id="comment.id" :comment-body="comment.body"
          @update="isEditMode = false" @cancel="isEditMode = false" /> -->
      </div>
      <!-- <CommentReaction :commentId="comment.id" :reactionGroups="comment.reactionGroups" /> -->
    </div>
  </div>
</template>

<style scoped>
.comment {
  position: relative;
  flex: 1;
  width: 100%;
}

.comment::before {
  @apply bg-gray-200 dark:bg-gray-700;
  display: block;
  position: absolute;
  top: 12.5px;
  right: 100%;
  left: -9px;
  width: 8px;
  height: 16px;
  pointer-events: none;
  content: " ";
  clip-path: polygon(0 50%, 100% 0, 100% 100%);
}

.comment::after {
  @apply bg-white dark:bg-black;
  position: absolute;
  top: 12.5px;
  right: 100%;
  left: -8px;
  display: block;
  width: 8px;
  height: 16px;
  pointer-events: none;
  content: " ";
  clip-path: polygon(0 50%, 100% 0, 100% 100%);
  margin-left: 1px;
}
</style>
