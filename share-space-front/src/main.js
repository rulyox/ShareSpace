import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import App from './App';
import router from './router';
import config from './config.json';

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.$config = config;
Vue.config.productionTip = false;

new Vue({

    render: h => h(App),
    router

}).$mount('#app');
