<script setup lang="ts">
import { GithubIssue } from "@vssueplay/utils";
import { ref } from "vue";

const githubIssue = ref(new GithubIssue());
</script>
<template>
  <div>Vssueplay - {{ githubIssue.name }}</div>
</template>
