<script setup lang="ts">
const config = {
  clientId: import.meta.env.VITE_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CLIENT_SECRET,
  author: import.meta.env.VITE_GITHUB_AUTHOR,
  repo: import.meta.env.VITE_GITHUB_REPO,
};
</script>

<template>
  <div style="width: 800px; margin: auto; padding: 50px">
    <Vssueplay :config="config" />
  </div>
</template>
