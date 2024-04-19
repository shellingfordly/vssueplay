import { createApp } from 'vue';
import App from './App.vue';
import Vssueplay from "@vssueplay/comps";
import "@vssueplay/comps/dist/style.css";

const app = createApp(App);

app.use(Vssueplay);
app.mount('#app');
