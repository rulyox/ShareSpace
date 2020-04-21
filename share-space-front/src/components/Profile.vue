<template>
    <div class="profile-container">

        <div class="info-container">

            <img class="info-image">

            <h3>{{ profileName }}</h3>

        </div>

        <div class="post-container">

            <div class="post-list">

                <Post v-for="post in this.postList" v-bind:key="post" v-bind:postId="post"></Post>

            </div>

        </div>

        <a class="float" v-on:click="showModal = true">+</a>

        <WriteModal v-if="showModal" v-on:close="showModal = false" />

    </div>
</template>

<script>
    import Post from './Post';
    import WriteModal from './WriteModal';

    async function getProfileInfo() {

        try {

            const profileResult = await this.$request.getProfile(this.profileId);

            this.profileName = profileResult.name;

        } catch(error) {

            console.log(error);

            await this.$router.push('/');

        }

    }

    async function getPosts() {

        try {

            const token = this.$store.getters.token;

            const postResult = await this.$request.getPostByUser(token, this.profileId, 0);

            if(postResult.result === 101) { // OK

                this.postTotal = postResult.total;
                this.postList = this.postList.concat(postResult.list);

            }

        } catch(error) {

            console.log(error);

        }

    }

    export default {
        props: {
            profileId: String
        },

        data() {
            return {
                profileName: '',
                postTotal: 0,
                postList: [],
                showModal: false
            };
        },

        mounted() {
            this.getProfileInfo();
            this.getPosts();
        },

        watch: {
            profileId() { this.getProfileInfo(); }
        },

        methods: {
            getProfileInfo,
            getPosts
        },

        components: {
            Post,
            WriteModal
        }
    };
</script>

<style scoped>
    .profile-container {
        flex: 1;

        background-color: #F5F5F5;

        display: flex;
        flex-direction: row;
    }

    .info-container {
        padding: 30px;
        background-color: #FAFAFA;

        text-align: center;

        box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 10px 20px rgba(0,0,0,0.20);
    }

    .info-image {
        width: 300px;
        height: 300px;
        border-radius: 30px;
        margin-bottom: 30px;
        background-color: black;
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
