import Vue from 'vue';
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'

import App from './App';
import { router } from './router';
import { store } from './store';
import './assets/material-icons.css';
import './global.less'

Vue.use(MuseUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
