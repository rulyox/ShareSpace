<template>
    <div class="post-container">

        <div class="post-header">
            <img class="post-user">
            {{this.userName}}
        </div>

        <img class="post-image">

        <div class="post-content">
            {{this.text}}
        </div>

        <div class="post-footer">
            <el-button class="post-comment" type="primary" icon="el-icon-chat-line-square" circle />
            <div>
                <el-button type="success" icon="el-icon-edit" circle />
                <el-button type="danger" icon="el-icon-delete" circle />
            </div>
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
        props: ['postId'],

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

        width: 600px;
        background-color: #E9E9E9;
        border-radius: 10px;
        margin-bottom: 30px;

        display: flex;
        flex-direction: column;
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

        background-color: mediumpurple;
    }

    .post-image {
        width: 600px;
        height: 600px;

        background-color: mediumpurple;
    }

    .post-content {
        padding: 15px;
    }

    .post-footer {
        padding-bottom: 15px;
        padding-right: 15px;
        padding-left: 15px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>
