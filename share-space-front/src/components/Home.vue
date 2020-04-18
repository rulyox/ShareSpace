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

    // check token and get user info
    async function getUserInfo() {

        const token = localStorage.getItem('token');
        if(token === undefined) await this.$router.push('/login'); // no token
        else {

            try {

                const loginResult = await this.$request.login(token);

                // save data to vuex
                await this.$store.dispatch('initialize', {
                    token: token,
                    id: loginResult.id,
                    email: loginResult.email,
                    name: loginResult.name
                });

            } catch(error) {

                console.log(error);

                localStorage.removeItem('token');

                // delete all data in vuex
                await this.$store.dispatch('reset');

                // go to login
                await this.$router.push('/login')

            }

        }

    }

    export default {
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
