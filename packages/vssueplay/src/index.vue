<script setup lang="ts">
import { defineProps, watchEffect } from "vue";
import { useGithubV4 } from "./hooks/useGithubV4";
import { type GithubV4Config } from "@vssueplay/utils";

const props = defineProps<{ config: GithubV4Config }>();
let githubIssue: ReturnType<typeof useGithubV4>

watchEffect(() => {
  if (props.config)
    githubIssue = useGithubV4(props.config);
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
