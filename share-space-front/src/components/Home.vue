<template>
    <div class="home-container">

        <Header v-bind:userId="userId" v-bind:userName="userName"></Header>

        <div class="content">
            <router-view name="homeContent"></router-view>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import Header from './Header';
    import config from "../config";

    // check token and get user info
    function getUserInfo() {

        const thisVue = this;
        const router = thisVue.$router;

        const token = localStorage.getItem('token');
        if(token === undefined) router.push('/login'); // no token
        else {
            axios.get(config.server + '/user', {headers: {'token': token}})
                .then(function(response) {
                    if(response.status === 200) {
                        console.log('Home Get User Success');
                        thisVue.userId = response.data.id;
                        thisVue.userEmail = response.data.email;
                        thisVue.userName = response.data.name;
                    } else { // error
                        console.log('Home Get User Error');
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
        data() {
            return {
                userId: "",
                userEmail: "",
                userName: ""
            };
        },

        methods: {
            getUserInfo
        },

        created() {
            this.getUserInfo();
        },

        components: {
            'Header': Header
        }
    };
</script>

<style scoped>
    .home-container {
        height: 100%;
        width: 100%;

        display: flex;
        flex-direction: column;
    }

    .content {
        flex: 1;

        overflow: hidden;
        background-color: #FAFAFA;

        display: flex;
    }
</style>
