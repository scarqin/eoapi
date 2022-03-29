import { createApp } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import App from "./App.vue";
import router from "./router.js";
import "windi.css";

createApp(App).use(router).use(Antd).mount("#app");
