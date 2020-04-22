<template>
    <div class="header-container">

        <a id="header-title" v-on:click="clickHome">ShareSpace</a>

        <el-dropdown id="header-profile" trigger="click">

            <img class="el-dropdown-link" id="header-profile-image">

            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user-solid" v-on:click.native="clickProfile">My Profile</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus">Action 2</el-dropdown-item>
            </el-dropdown-menu>

        </el-dropdown>

    </div>
</template>

<script>
    function clickHome() {

        const path = '/';
        if(this.$router.currentRoute.path !== path) this.$router.push(path);

    }

    function clickProfile() {

        const userData = this.$store.getters.userData;
        const userId = userData.id;

        const path = '/profile/' + userId;
        if(this.$router.currentRoute.path !== path) this.$router.push(path);

    }

    export default {
        methods: {
            clickHome,
            clickProfile
        }
    };
</script>

<style scoped>
    .header-container {
        width: 100%;
        height: 70px;
        background-color: #253B80;
        z-index: 1;

        display: flex;
        flex-direction: row;
        align-items: center;

        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }

    #header-title {
        font-size: 20px;
        font-weight: 700;
        text-decoration: none;
        color: #FAFAFA;

        cursor: pointer;

        margin-left: 30px;
    }

    #header-profile {
        font-size: 15px;

        cursor: pointer;

        margin-left: auto;
        margin-right: 30px;
    }

    #header-profile-image {
        width: 50px;
        height: 50px;
        background-color: black;
        border-radius: 25px;
    }
</style>
