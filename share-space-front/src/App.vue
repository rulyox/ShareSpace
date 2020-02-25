<template>
    <div class="app-container">

        <router-view name="appContent"></router-view>

    </div>
</template>

<script>
    import axios from 'axios';
    import config from './config';

    function checkLocalToken() {

        let router = this.$router;

        if(router.currentRoute.path === '/login') return;

        let token = localStorage.getItem('token');

        if(token === undefined) router.push('/login');
        else {

            axios.get(config.server + '/user', {headers: {'token': token}})
                .then(function(response) {

                    if(response.data.auth === undefined || response.data.auth === false) router.push('/login');
                    else console.log('App Token Check Success');

                });

        }

    }

    export default {
        methods: {
            checkLocalToken
        },

        created() {
            this.checkLocalToken();
        },

        // ! check in each route?
        // watch: {
        //
        //     // eslint-disable-next-line no-unused-vars
        //     $route(to, from) {
        //
        //         this.checkLocalToken();
        //
        //     }
        //
        // }

    };
</script>

<style>
    html, body {
        font-family: 'Noto Sans', sans-serif;

        height: 100%;
        width: 100%;
    }

    .app-container {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
    }
</style>
