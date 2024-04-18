<script setup lang="ts">
import { useGithubIssue } from "./store";
import type { GithubIssueConfig } from "@vssueplay/utils";

const props = defineProps<{ config: GithubIssueConfig }>();

const githubIssue = useGithubIssue(props.config);

function loginAuthorize() {
  const url = githubIssue.loginAuthorize();
  console.log(url);

  window.location.href = url;
}
</script>
<template>
  <div>Vssueplay - {{ githubIssue.name }}</div>

  <div>
    <button @click="loginAuthorize">loginAuthorize</button>
  </div>
</template>
