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

            // check if token exists
            if(token === null) return;

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
        props: ['profileId'],

        data() {
            return {
                profileName: '',
                postTotal: 0,
                postList: [],
                showModal: false
            };
        },

        computed: {
            token() { return this.$store.getters.token; }
        },

        mounted() {
            this.getProfileInfo();
            this.getPosts();
        },

        watch: {
            profileId() { this.getProfileInfo(); },
            token(value) { if(value !== null) this.getPosts(); }
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

        display: flex;
        flex-direction: row;
    }

    .info-container {
        overflow: hidden;
        padding: 30px;
        background-color: #E9E9E9;
        text-align: center;
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
