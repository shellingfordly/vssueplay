# vuepress-plugin-vssueplay

This is a vue3-powered issue-based comment plugin for vuepress.

## Install

```
pnpm i @vssueplay/vuepress-plugin-vssueplay
```

## Config

set config in `.vuepress/config.ts`

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

## Used

```md
# Vssueplay

<Vssueplay />
```
