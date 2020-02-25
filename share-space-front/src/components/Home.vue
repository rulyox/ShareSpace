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

        const token = localStorage.getItem('token');

        if(token === undefined) this.$router.push('/login'); // if token does not exist
        else {

            const thisVue = this;

            axios.get(config.server + '/user', {headers: {'token': token}})
                .then((response) => {

                    if(response.data.auth === undefined || response.data.auth === false) thisVue.$router.push('/login'); // if token is wrong
                    else if(response.data.auth) {

                        thisVue.userId = response.data.id;
                        thisVue.userEmail = response.data.email;
                        thisVue.userName = response.data.name;

                        console.log('Home User Info Success');

                    }

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
