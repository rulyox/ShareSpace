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

                const loginResult = await this.requestLogin(token);

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

    function requestLogin(token) {
        return new Promise((resolve, reject) => {

            this.$axios.get(this.$config.server + '/user',
                {
                    headers: {token: token}
                })
                .then((response) => {

                    resolve({
                        id: response.data.id,
                        email: response.data.email,
                        name: response.data.name
                    });

                })
                .catch((error) => { reject(error); });

        });
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
            getUserInfo,
            requestLogin
        },

        created() {
            this.getUserInfo();
        },

        components: {
            'Header': Header
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
