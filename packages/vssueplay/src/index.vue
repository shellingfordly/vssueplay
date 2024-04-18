<script setup lang="ts">
import { defineProps, watchEffect } from "vue";
import { useGithubV4 } from "./hooks/useGithubV4";
import { type GithubV4Config } from "@vssueplay/utils";

const props = defineProps<{ config: GithubV4Config }>();
const { setGithubConfig, getAuthorizeUrl } = useGithubV4();

watchEffect(() => {
  if (props.config) {
    setGithubConfig(props.config)
  }
})

function login() {
  const url = getAuthorizeUrl();
  window.location.href = url;
}
</script>
<template>
  <div>Vssueplay</div>

  <div>
    <button @click="login">loginAuthorize</button>
  </div>
</template>
