# Github_V4

<script setup>
import Vssueplay from '@vssueplay/comps';
import {h} from "vue"
import "@vssueplay/comps/dist/style.css";

const component = h(Vssueplay.VssueplayComponent)
const config = {
  clientId: import.meta.env.VITE_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CLIENT_SECRET,
  author: import.meta.env.VITE_GITHUB_AUTHOR,
  repo: import.meta.env.VITE_GITHUB_REPO,
};
</script>

{{VssueplayComponent}}

<component :is="component" :config="config" />
