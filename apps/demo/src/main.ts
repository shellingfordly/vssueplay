import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import Vssueplay from "@vssueplay/comps";

const app = createApp(App)


app.use(Vssueplay);
app.mount('#app')
