<template>
    <div class="feed-container">

        <div class="post-list-container">

            <div class="post-list">

                <Post v-for="post in this.postList" v-bind:key="post" v-bind:postId="post"></Post>

            </div>

        </div>

    </div>
</template>

<script>
    import Post from './Post';

    async function getFeed() {

        try {

            const token = this.$store.getters.token;

            const feedResult = await this.$request.getFeed(token, 0);

            for(let i = 0; i < feedResult.length; i++) this.postList.push(feedResult[i].post);

        } catch(error) {

            console.log(error);

        }

    }

    export default {
        data() {
            return {
                postTotal: 0,
                postList: []
            };
        },

        mounted() {
            this.getFeed();
        },

        methods: {
            getFeed
        },

        components: {
            Post
        }
    };
</script>

<style scoped>
    .feed-container{
        flex: 1;

        background-color: #F5F5F5;

        display: flex;
        flex-direction: column;
    }

    .post-list-container {
        flex: 1;
        overflow: auto;
    }

    .post-list {
        margin: 50px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
