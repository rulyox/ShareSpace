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
            <button class="btn post-comment">
                <img src="../assets/arrow_down.svg">
                {{this.commentNumber}} Comments
            </button>
            <div>
                <button class="btn post-edit">Edit</button>
                <button class="btn post-delete">Delete</button>
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
        border-radius: 15px;
        margin-bottom: 30px;

        display: flex;
        flex-direction: column;
    }

    .post-header {
        padding: 15px;
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
        padding: 15px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .post-comment {
        font-size: 13px;
        padding: 0;
    }

    .post-edit {
        font-size: 13px;
        color: #173cbf;
    }

    .post-delete {
        font-size: 13px;
        color: #b44115;
    }
</style>
