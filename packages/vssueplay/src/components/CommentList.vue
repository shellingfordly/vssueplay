<script setup lang="ts">
import CommentItem from "./CommentItem.vue"
import { useGithubV4 } from "../hooks/useGithubV4";

const { comments } = useGithubV4();
</script>
<template>
  <CommentItem :comment="comment" v-for="comment in comments" :key="comment.id" />
</template>
