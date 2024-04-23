import { defineClientConfig } from 'vuepress/client';
import vssueplayPlugin from 'vssueplay';
import "vssueplay/dist/style.css";

declare const VSSUEPLAY_CONFIG: string;

export default defineClientConfig({
  enhance({ app }) {
    const config = JSON.parse(VSSUEPLAY_CONFIG);
    app.use(vssueplayPlugin as any, { config })
  },
})