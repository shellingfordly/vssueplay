import Vssueplay from "./Vssueplay.vue";
import { type Plugin, type FunctionPlugin, h } from "vue";
import { lazyImgDirective } from "./directive";
import config from '../package.json'
import "./styles/index.css"

const createVssueplayPlugin: FunctionPlugin = (app, ...options) => {
  lazyImgDirective(app);
  app.component("Vssueplay", h(Vssueplay, { ...options }));
}

const VssueplayPlugin: Plugin = {
  install: createVssueplayPlugin,
}

const version = config.version;

export { version, Vssueplay, createVssueplayPlugin }

export default VssueplayPlugin


