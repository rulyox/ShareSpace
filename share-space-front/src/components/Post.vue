<template>
    <div class="post-container">

        <div class="post-header">
            <img class="post-user" src="../assets/logo.png">
            {{this.userName}}
        </div>

        <img class="post-image" src="../assets/logo.png">

        <div class="post-content">
            {{this.text}}
        </div>

    </div>
</template>

<script>
    async function getPostData(postId) {

        try {

            const token = this.$store.getters.token;

            const postDataResult = await this.$request.getPostData(token, postId);

            if(postDataResult.result === 101) { // OK

                const postData = postDataResult.data;

                this.userName = postData.name;
                this.text = postData.text;
                this.image = postData.image;

            }

        } catch(error) {

            console.log(error);

        }

    }

    export default {
        props: {
            postId: Number
        },

        data() {
            return {
                userName: '',
                text: '',
                image: []
            };
        },

        mounted() {
            this.getPostData(this.postId);
        },

        methods: {
            getPostData
        }
    }
</script>

<style scoped>
    .post-container {
        flex: 1;

        width: 500px;
        border-radius: 10px;
        margin-bottom: 50px;
        background-color: #FAFAFA;

        display: flex;
        flex-direction: column;

        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    }

    .post-container:hover {
        box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 10px 20px rgba(0,0,0,0.20);
    }

    .post-header {
        padding: 15px;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .post-user {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin-right: 15px;
        background-color: black;
    }

    .post-image {
        width: 500px;
        height: 500px;
        background-color: black;
    }

    .post-content {
        padding: 15px;
    }
</style>
