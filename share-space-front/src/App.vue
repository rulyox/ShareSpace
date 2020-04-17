<template>
    <div class="app-container">

        <router-view name="appContent"></router-view>

    </div>
</template>

<script>
    export default { };
</script>

<style>
    html, body {
        font-family: 'Noto Sans', sans-serif;

        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    .app-container {
        height: 100%;
        width: 100%;
    }
</style>
