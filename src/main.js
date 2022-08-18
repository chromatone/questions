import { createApp } from "vue";
import App from "./app.vue";


import './styles/index.css'
import 'floating-vue/dist/style.css'
import "virtual:windi.css";


import FloatingVue from 'floating-vue'


import router from './router'


const app = createApp(App);
app.use(router)
app.use(FloatingVue)


app.mount("#touchme-app");

