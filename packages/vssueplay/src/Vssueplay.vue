<script setup lang="ts">
import { defineProps, watchEffect } from "vue";
import { useGithubIssue } from "./store";
import { type GithubIssueConfig } from "@vssueplay/utils";

const props = defineProps<{ config: GithubIssueConfig }>();
let githubIssue: ReturnType<typeof useGithubIssue>

watchEffect(() => {
  if (props.config)
    githubIssue = useGithubIssue(props.config);
})

function login() {
  const url = githubIssue.getAuthorizeUrl();
  window.location.href = url;
}
</script>
<template>
  <div>Vssueplay</div>

  <div>
    <button @click="login">loginAuthorize</button>
  </div>
</template>
