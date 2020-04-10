import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'axios';
import App from './App';
import router from './router';

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({

    render: h => h(App),
    router

}).$mount('#app');
