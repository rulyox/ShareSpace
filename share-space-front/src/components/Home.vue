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

                this.$store.commit('setToken', token);
                this.$store.commit('setId', loginResult.id);
                this.$store.commit('setEmail', loginResult.email);
                this.$store.commit('setName', loginResult.name);

            } catch(error) {

                console.log(error);

                localStorage.removeItem('token');
                this.$store.commit('removeToken');

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
