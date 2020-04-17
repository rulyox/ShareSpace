import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import request from './request';

Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.prototype.$request = request;

Vue.config.productionTip = false;

new Vue({

    render: h => h(App),
    router

}).$mount('#app');
