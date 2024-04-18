<script setup lang="ts">
import { GithubV4CommentInfo } from "@vssueplay/utils";
import { ref } from "vue"

const props = defineProps<{ comment: GithubV4CommentInfo }>();
const isEditMode = ref(false);

function onGoGithubUserPage() {
  window.open(props.comment.author.url);
}
</script>

<template>
  <div flex mb5>
    <img class="cp mr-5 w-10 h-10 rd-10" :src="comment.author.avatarUrl" :alt="comment.author.login"
      @click="onGoGithubUserPage" />

    <div class="comment">
      <div flex-center-between p2 b-b-1 b-gray-200 dark:b-gray-700>
        <div>
          <a a-blue mr-2 :href="comment.author.url" target="_blank">
            {{ comment.author.login }}
          </a>
          <span font-size-3 c-gray> commented on Jan 13, 2019 </span>
        </div>
        <CommentAction :comment="comment" @editor="isEditMode = true" />
      </div>
      <div p4>
        <div v-if="!isEditMode" class="markdown-body" v-html="comment.bodyHTML"></div>
        <CommentEditor v-if="isEditMode" :comment-id="comment.id" :comment-body="comment.body"
          @update="isEditMode = false" @cancel="isEditMode = false" />
      </div>
      <CommentReaction :commentId="comment.id" :reactionGroups="comment.reactionGroups" />
    </div>
  </div>
</template>

<style scoped>
.comment {
  --at-apply: flex-1 relative w-full b-default;

  &::before {
    --at-apply: bg-gray-200 dark:bg-gray-700;
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

  &::after {
    --at-apply: bg-white dark:bg-black;
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
}
</style>
