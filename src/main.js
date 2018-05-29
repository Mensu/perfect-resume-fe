import Vue from 'vue';
import MuseUI from 'muse-ui'
import theme from 'muse-ui/lib/theme';
import 'muse-ui/dist/muse-ui.css'

import App from './App';
import RatingBar from './components/RatingBar';
import { router } from './router';
import { store } from './store';
import { PipeService } from './services/pipes';
import './assets/material-icons.css';
import './global.less'

Vue.use(PipeService);
Vue.use(MuseUI);
theme.use('light');
Vue.component('rating-bar', RatingBar);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
