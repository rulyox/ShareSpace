<template>
    <div class="post-container">

        <div class="post-header">
            <img class="post-user">
            {{this.userName}}
        </div>

        <img class="post-image">

        <div class="post-content">
            {{this.text}}
            {{this.image.length}}
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
    function getPost(postId) {

        this.userName = 'YoungHwan Joo';
        this.commentNumber = 0;

        if(postId === '1') this.text = "some text here";
        else if(postId === '2') {

            this.text = "hello world";
            this.image.push('asdf');
            this.image.push('asdf');

        }
        else if(postId === '3') this.text = "testing id 3...";

    }

    export default {
        props: ['postId'],

        data() {
            return {
                userName: "",
                text: "",
                image: [],
                commentNumber: 0
            };
        },

        methods: {
            getPost
        },

        created() {
            this.getPost(this.postId);
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
