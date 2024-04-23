import Vssueplay from "./Vssueplay.vue";
import { type App, h } from "vue";
import "./styles/index.css"
import { lazyImgDirective } from "./directive";
import { GithubV4Config } from "@vssueplay/utils";


const VssueplayPlugin = {
  get version() {
    return "0"
  },
  install: (app: App, options: { config: GithubV4Config }) => {
    lazyImgDirective(app);
    app.component("Vssueplay", h(Vssueplay, { ...options }));
  },
  Vssueplay: h(Vssueplay)
}


export { Vssueplay }

export default VssueplayPlugin


