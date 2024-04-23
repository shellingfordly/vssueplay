import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { vssueplayPlugin } from '@vssueplay/vuepress-plugin-vssueplay'

export default defineUserConfig({
  lang: 'en-US',

  title: 'VuePress',
  description: 'My first VuePress Site',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',
    navbar: ['/', '/get-started'],
  }),
  bundler: viteBundler(),
  plugins: [
    vssueplayPlugin({ config: { clientId: " ", clientSecret: "", repo: "", author: "" } }),
    shikiPlugin({
      langs: ['ts', 'json', 'vue', 'md', 'bash', 'diff'],
      theme: "aurora-x"
    }),
  ],
})
