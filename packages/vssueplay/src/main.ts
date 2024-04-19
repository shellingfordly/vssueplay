import VssueplayComponent from "./index.vue";
import { type App } from "vue";
import "./styles/index.css"

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


