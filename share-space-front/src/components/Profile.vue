<template>
    <div class="profile-container">

        <div class="info-container">

            <img class="info-image">

            <h3>{{ profileName }}</h3>

        </div>

        <div class="post-container">

            <div class="post-list">

                <Post v-for="item in this.items" v-bind:key="item" v-bind:postId="item"></Post>

            </div>

        </div>

        <a href="#" class="float">+</a>
    </div>
</template>

<script>
    import Post from './Post';
    import axios from "axios";
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
                        console.log('Profile Get User Success');
                        thisVue.userId = response.data.id;
                        thisVue.userEmail = response.data.email;
                        thisVue.userName = response.data.name;
                    } else { // error
                        console.log('Profile Get User Error');
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

    function getProfileInfo() {

        const thisVue = this;
        const router = thisVue.$router;

        axios.get(config.server + '/user/data/' + this.profileId)
            .then((response) => {
                if(response.status === 200) {
                    thisVue.profileName = response.data.name;
                    console.log('Profile Target Info Success');
                } else { // wrong user
                    alert('No user found!');
                    router.push('/');
                }
            })
            .catch(() => { // wrong user
                alert('No user found!');
                router.push('/');
            });

    }

    export default {
        props: ['propsProfileId'],

        data() {
            return {
                userId: "",
                userEmail: "",
                userName: "",
                profileId: this.propsProfileId,
                profileName: "",
                items: ['1', '2', '3']
            };
        },

        methods: {
            getUserInfo,
            getProfileInfo
        },

        created() {
            this.getUserInfo();
            this.getProfileInfo();
        },

        updated() {
            this.getProfileInfo();
        },

        components: {
            'Post': Post
        }
    };
</script>

<style scoped>
    .profile-container {
        flex: 1;

        display: flex;
        flex-direction: row;
    }

    .info-container {
        overflow: hidden;
        padding: 30px;
        background-color: #E9E9E9;
    }

    .info-image {
        width: 300px;
        height: 300px;
        border-radius: 30px;
        margin-bottom: 30px;

        background-color: mediumpurple;
    }

    .post-container {
        flex: 1;

        overflow: auto;
    }

    .post-list {
        margin: 50px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .float{
        position: fixed;
        width: 60px;
        height: 60px;
        bottom: 40px;
        right: 40px;
        background-color: #253B80;
        color: #FFF;
        border-radius: 30px;
        text-align: center;
        box-shadow: 2px 2px 3px #999;
    }
</style>
