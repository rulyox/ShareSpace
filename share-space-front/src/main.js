import Vue from 'vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'axios';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

new Vue({

    render: h => h(App),
    router

}).$mount('#app');
