# Vssueplay

This is a vue3-powered issue-based comment component.

## Install

```bash
pnpm i vssueplay
```

## Used

```ts
import { createApp } from "vue";
import App from "./App.vue";

import { Vssueplay } from "vssueplay";
import "vssueplay/dist/style.css";

const app = createApp(App);

app.component("Vssueplay", Vssueplay);

app.mount("#app");
```

```vue
<script setup lang="ts">
const config = {
  clientId: "",
  clientSecret: "",
  author: "",
  repo: "",
};
</script>

<template>
  <Vssueplay :config="config" />
</template>
```
