<template>
    <div class="header-container">

        <a id="header-title" v-bind:href="'/'">ShareSpace</a>

        <el-dropdown id="header-profile" trigger="click">

            <img class="el-dropdown-link" width="50px" height="50px" style="background-color: mediumpurple; border-radius: 25px;"/>

            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user-solid" v-on:click.native="clickProfile">My Profile</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus">Action 2</el-dropdown-item>
            </el-dropdown-menu>

        </el-dropdown>

    </div>
</template>

<script>
    function clickProfile() {

        const userId = this.$store.state.userId;

        this.$router.push('/profile/' + userId);

    }

    export default {
        methods: {
            clickProfile
        }
    };
</script>

<style scoped>
    .header-container {
        width: 100%;
        height: 70px;
        background-color: #253B80;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    #header-title {
        font-size: 20px;
        font-weight: 700;
        text-decoration: none;
        color: #FAFAFA;
        margin-left: 30px;
    }

    #header-profile {
        font-size: 15px;
        margin-left: auto;
        margin-right: 30px;
    }
</style>
