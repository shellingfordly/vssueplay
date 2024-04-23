# vuepress-plugin-vssueplay

This is a vue3-powered issue-based comment plugin for vuepress.

## Install

```
pnpm i @vssueplay/vuepress-plugin-vssueplay
```

## Config

set `.vuepress/config.ts`

```ts
export default defineUserConfig({
  title: "VuePress",
  description: "My first VuePress Site",
  plugins: [
    {
      name: "@vssueplay/vuepress-plugin-vssueplay",
    },
  ],
});
```

## Used

```md
<Vssueplay />
```
