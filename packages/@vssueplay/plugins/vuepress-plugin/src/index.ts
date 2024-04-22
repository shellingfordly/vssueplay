// import { path } from 'vuepress/utils';

import { path } from "vuepress/utils";

export default function createVssueplayPlugin(options: any) {
  return {
    name: 'vuepress-plugin-vssueplay',
    define: {
      VSSUEPLAY_OPTIONS: JSON.stringify(options),
    },
    alias: {
      '@vssueplay/utils': path.resolve(__dirname, '@vssueplay/utils'),
    },
    clientConfigFile: path.resolve(__dirname, './clientConfig.js'),
  }
};