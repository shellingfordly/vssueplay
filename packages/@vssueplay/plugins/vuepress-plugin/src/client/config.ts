import { defineClientConfig } from 'vuepress/client';
import { Vssueplay } from 'vssueplay';
import "vssueplay/dist/style.css";
import { h } from 'vue';

declare const VSSUEPLAY_CONFIG: string;

export default defineClientConfig({
  enhance({ app }) {
    const options = JSON.parse(VSSUEPLAY_CONFIG);
    app.component("Vssueplay", h(Vssueplay, options))
  },
})