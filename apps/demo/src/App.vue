<script setup lang="ts">
const config = {
  clientId: import.meta.env.VITE_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CLIENT_SECRET,
  author: import.meta.env.VITE_GITHUB_AUTHOR,
  repo: import.meta.env.VITE_GITHUB_REPO,
};
</script>

<template>
  <Vssueplay :config="config" />
</template>
