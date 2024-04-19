import VssueplayComponent from "./index.vue";
import { type App } from "vue";
import "./styles/index.css"
import { lazyImgDirective } from "./directive";

const VssueplayPlugin = {
  get version() {
    return "0"
  },
  install: (app: App) => {
    lazyImgDirective(app);
    app.component("Vssueplay", VssueplayComponent);
  },
  VssueplayComponent: VssueplayComponent
}


export default VssueplayPlugin


