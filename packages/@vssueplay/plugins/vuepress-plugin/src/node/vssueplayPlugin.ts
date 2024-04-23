import type { VssueplayPluginOptions } from "../shared/index.js";
import { path, getDirname } from "vuepress/utils";

const __dirname = getDirname(import.meta.url)

/**
 * @type {import('@vuepress/types').Plugin}
 */
export const vssueplayPlugin = (options: VssueplayPluginOptions) => {
  return {
    name: '@vssueplay/vuepress-plugin-vssueplay',
    define: {
      VSSUEPLAY_CONFIG: JSON.stringify(options),
    },
    clientConfigFile: path.resolve(__dirname, '../client/config.js'),
  }
};
