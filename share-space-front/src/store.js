import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        token: null,
        userId: null,
        userEmail: null,
        userName: null
    },

    getters: {
        token: state => {
            return state.token;
        },
        userData: state => {
            return {
                id: state.userId,
                email: state.userEmail,
                name: state.userName
            };
        }
    },

    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        deleteToken(state) {
            state.token = null;
        },
        setId(state, id) {
            state.userId = id;
        },
        deleteId(state) {
            state.userId = null;
        },
        setEmail(state, email) {
            state.userEmail = email;
        },
        deleteEmail(state) {
            state.userEmail = null;
        },
        setName(state, name) {
            state.userEmail = name;
        },
        deleteName(state) {
            state.userName = null;
        }
    },

    actions: {
        initialize(context, data) {
            context.commit('setToken', data.token);
            context.commit('setId', data.id);
            context.commit('setEmail', data.email);
            context.commit('setName', data.name);
        },
        reset(context) {
            context.commit('deleteToken');
            context.commit('deleteId');
            context.commit('deleteEmail');
            context.commit('deleteName');
        }
    }

});

export default store;
