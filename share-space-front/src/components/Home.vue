<template>
    <div class="home-container">

        <Header></Header>

        <div class="content">
            <router-view name="homeContent"></router-view>
        </div>

    </div>
</template>

<script>
    import Header from './Header';

    export default {
        components: {
            Header
        }
    };
</script>

<style scoped>
    .home-container {
        height: 100%;
        width: 100%;

        display: flex;
        flex-direction: column;
    }

    .content {
        flex: 1;

        overflow: hidden;
        background-color: #FAFAFA;

        display: flex;
    }
</style>
