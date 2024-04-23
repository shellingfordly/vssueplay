<script setup lang="ts">
import { defineProps, watchEffect } from "vue";
import { useGithubV4 } from "./hooks/useGithubV4";
import { type GithubV4Config } from "@vssueplay/utils";
import CommentList from "./components/CommentList.vue";
import CommentTool from "./components/CommentTool.vue";
import CommentAuthor from "./components/CommentAuthor.vue";

const props = defineProps<{ config: GithubV4Config }>();
const { setGithubConfig } = useGithubV4();

watchEffect(() => {
  if (props.config) {
    setGithubConfig(props.config)
  }
})
</script>
<template>
  <div>
    <CommentTool />
    <CommentAuthor />
    <CommentList />
  </div>
</template>
