<template>
    <div class="app-container">

        <router-view name="appContent"></router-view>

    </div>
</template>

<script>
    import axios from 'axios';
    import config from './config';

    function checkToken() {

        const thisVue = this;
        const router = thisVue.$router;

        if(router.currentRoute.path === '/login') return;

        const token = localStorage.getItem('token');
        if(token === undefined) router.push('/login'); // no token
        else {
            axios.get(config.server + '/user', {headers: {'token': token}})
                .then(function(response) {
                    if(response.status === 200) console.log('App Token Check Success');
                    else { // error
                        console.log('App Token Check Error');
                        localStorage.removeItem('token');
                        router.push('/login');
                    }
                })
                .catch(() => { // wrong token
                    localStorage.removeItem('token');
                    router.push('/login')
                });
        }

    }

    export default {
        methods: {
            checkToken
        }
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
