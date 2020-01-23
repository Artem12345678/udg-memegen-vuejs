import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import Verte from 'verte';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'verte/dist/verte.css';

import App from './components/App/App.vue';

Vue.use(BootstrapVue);

Vue.component('verte', Verte);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
