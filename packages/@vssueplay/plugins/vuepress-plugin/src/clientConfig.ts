import { defineClientConfig } from 'vuepress/client';
import { Vssueplay } from 'vssueplay_test';
import "vssueplay/dist/style.css";

export default defineClientConfig({
  rootComponents: [Vssueplay],
})