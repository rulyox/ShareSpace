import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import store from './store';
import request from './request';

Vue.use(ElementUI);

Vue.prototype.$request = request;

Vue.config.productionTip = false;

new Vue({

    render: h => h(App),
    store,
    router

}).$mount('#app');
