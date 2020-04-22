<template>
    <div class="post-container" v-bind:id="'post-' + postId">

        <div class="post-header">
            <img class="post-user" src="../assets/logo.png">
            {{this.userName}}
        </div>

        <img class="post-image" v-bind:src="image[0]">

        <div class="post-content">
            {{this.text}}
        </div>

    </div>
</template>

<script>
    async function getPostData(postId) {

        const thisElement = document.getElementById('post-' + postId);

        // hide element
        thisElement.style.display = 'none';

        try {

            const token = this.$store.getters.token;

            const postDataResult = await this.$request.getPostData(token, postId);

            if(postDataResult.result === 101) { // OK

                const postData = postDataResult.data;

                this.userName = postData.name;
                this.text = postData.text;

                // show element
                thisElement.style.display = 'block';

                const imageList = postData.image;

                // save base64 image to list
                for(let i = 0; i < imageList.length; i++) {

                    const image = await this.$request.getImageFile(token, postId, imageList[i]);

                    if(image instanceof ArrayBuffer) {

                        const imageBase64 = Buffer.from(image).toString('base64');
                        this.image.push('data:image/png;base64, ' + imageBase64);

                    }

                }

                // show image
                if(this.image.length > 0) thisElement.getElementsByClassName('post-image')[0].style.display = 'block';

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
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
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

        display: none;
    }

    .post-content {
        padding: 15px;
    }
</style>
