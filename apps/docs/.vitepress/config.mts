import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vssueplay",
  description: "A Vue3-powered Issue-based Comment Plugin",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Demo', link: '/demos/github_v4' },
      { text: 'Guide', link: '/guide/what-is-vssueplay' },
    ],

    sidebar: {
      "/guide/": {
        base: '/guide/',
        items: [
          { text: 'what is vssueplay', link: 'what-is-vssueplay' },
          { text: 'getting started', link: 'getting-started' },
        ]
      },
      "/demos/": {
        base: '/demos/github_v4',
        items: [
          { text: 'Github_v4', link: '/demos/github_v4' },
        ]
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/shellingfordly/vssueplay' }
    ]
  }
})
