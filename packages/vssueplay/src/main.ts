import VssueplayComponent from "./Vssueplay.vue";
import { type App } from "vue";

const VssueplayPlugin = {
  get version() {
    return "0"
  },
  install: (app: App) => {
    app.component("Vssueplay", VssueplayComponent);
  },
  VssueplayComponent: VssueplayComponent
}


export default VssueplayPlugin


