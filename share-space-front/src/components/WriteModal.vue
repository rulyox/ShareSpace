<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    Write New Post

                    <input type="file" multiple accept="image/png, image/jpeg" v-on:change="uploadImage" ref="image">

                    <button type="submit" v-on:click="clickWrite">Post</button>

                    <button v-on:click="$emit('close')">Close</button>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    function uploadImage() {

        const imageFile = this.$refs.image.files[0];
        this.imageList.push(imageFile);

    }

    async function clickWrite() {

        const token = this.$store.getters.token;
        const text = 'this is text';

        try {

            await this.$request.writePost(token, text, this.imageList);

            console.log('done');

        } catch(error) {

            console.log(error);

        }

    }

    export default {
        data() {
            return {
                imageList: []
            };
        },

        methods: {
            uploadImage,
            clickWrite
        }
    };
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 300px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;

        display: flex;
        flex-direction: column;
    }

    /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>
