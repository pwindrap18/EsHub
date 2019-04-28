import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import wysiwyg from "vue-wysiwyg";
import CKEditor from '@ckeditor/ckeditor5-vue';
import "vue-wysiwyg/dist/vueWysiwyg.css";

Vue.use(CKEditor);


Vue.use(wysiwyg, {}); // config is optional. more below

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");