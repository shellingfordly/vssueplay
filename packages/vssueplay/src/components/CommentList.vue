<script setup lang="ts">
import CommentItem from "./CommentItem.vue"
import { useGithubV4 } from "../hooks/useGithubV4";

const { comments } = useGithubV4();
</script>
<template>
  <template v-for="comment in comments" :key="comment.id">
    <CommentItem :comment="comment" />
  </template>
</template>
