<template>
    <div class="home-container">

        <Header v-bind:userId="userId" v-bind:userName="userName"></Header>

        <div class="content">
            <router-view name="homeContent"></router-view>
        </div>

    </div>
</template>

<script>
    import Header from './Header';

    // check token and get user info
    async function getUserInfo() {

        const token = localStorage.getItem('token');
        if(token === undefined) await this.$router.push('/login'); // no token
        else {

            try {

                const loginResult = await this.$request.login(token);

                this.userId = loginResult.id;
                this.userEmail = loginResult.email;
                this.userName = loginResult.name;

            } catch(error) {

                console.log(error);

                localStorage.removeItem('token');
                await this.$router.push('/login')

            }

        }

    }

    export default {
        data() {
            return {
                userId: '',
                userEmail: '',
                userName: ''
            };
        },

        methods: {
            getUserInfo
        },

        created() {
            this.getUserInfo();
        },

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
