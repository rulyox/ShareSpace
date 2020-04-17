import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        token: null,
        userId: 0,
        userEmail: '',
        userName: ''
    },

    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        removeToken(state) {
            state.token = null;
        },
        setId(state, id) {
            state.userId = id;
        },
        setEmail(state, email) {
            state.userEmail = email;
        },
        setName(state, name) {
            state.userEmail = name;
        }
    }

});

export default store;
