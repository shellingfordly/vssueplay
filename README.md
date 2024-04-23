<h1 align="center">Vssueplay</h1>

[WIP]

<p align="center">
This is a Vue3-powered Issue-based Comment Plugin.
</p>

This inspiration of project comes in [vssue](https://github.com/meteorlxy/vssue). The vssueplay is equivalent to a vue3-version of vssue.

The vssueplay is currently under development, you can check out [vue-comment](https://github.com/shellingfordly/vue-comment), which is the front-end demo project of vssueplay

## TODO LIST

Currently only transplanted github_v4 version.

- [x] github_v4

## Used

<details>
<summary>
As vuepress plugin:
</summary>

1. install `@vssueplay/vuepress-plugin-vssueplay`

```bash
pnpm i @vssueplay/vuepress-plugin-vssueplay
```

2. set config in `.vuepress/config.ts`

```ts
import { vssueplayPlugin } from "@vssueplay/vuepress-plugin-vssueplay";

export default defineUserConfig({
  title: "VuePress",
  plugins: [
    vssueplayPlugin({
      config: {
        clientId: "",
        clientSecret: "",
        repo: "",
        author: "",
      },
    }),
  ],
});
```

3. used `<Vssueplay />` in markdown

```md
# Vssueplay

<Vssueplay />
```

</details>

<details>
<summary>
As vue component:
</summary>

1. install

```bash
pnpm i vssueplay
```

1. add component to main.ts

```ts
import { createApp } from "vue";
import App from "./App.vue";

import { Vssueplay } from "vssueplay";
import "vssueplay/dist/style.css";

const app = createApp(App);

app.component("Vssueplay", Vssueplay);

app.mount("#app");
```

3. used `<Vssueplay />` in vue

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

</details>

## Documentation

TODO

## Contributing

📜 Feel free to open issues if you have any problems or ideas.

❤️ Contributions welcome very much!
