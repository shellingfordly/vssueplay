import type { GithubV4Config } from "@vssueplay/utils";
import { path } from "vuepress/utils";

export default function vssueplayPlugin(options: GithubV4Config) {
  return {
    name: 'vuepress-plugin-vssueplay',
    define: {
      VSSUEPLAY_CONFIG: JSON.stringify(options),
    },
    alias: {
      'vssueplay': require.resolve('vssueplay'),
    },
    clientConfigFile: path.resolve(__dirname, './clientConfig.js'),
  }
};
