<template>
    <div class="login-container">

        <div class="login-dialog">

            <a class="dialog-title">ShareSpace</a>

            <el-input class="dialog-input" placeholder="Enter email" v-model="email" />
            <el-input class="dialog-input" placeholder="Enter password" v-model="password" show-password />

            <div class="dialog-button">
                <el-button v-on:click.prevent="clickLogin" type="primary">Login</el-button>
                <el-button v-on:click.prevent="clickLogin" type="primary">Sign Up</el-button>
            </div>

        </div>

    </div>
</template>

<script>
    async function clickLogin() {

        if(this.email === '' || this.password === '') {
            alert('Empty email or password!');
            return;
        }

        try {

            const tokenResult = await this.requestToken(this.email, this.password);

            if(tokenResult.result === 101) {

                localStorage.setItem('token', tokenResult.token);

                await this.$router.push('/');

            } else if(tokenResult.result === 201) {

                alert('Login failed. Check email or password!');

                this.email = '';
                this.password = '';

            } else {

                alert('Unknown error!');

                this.email = '';
                this.password = '';

            }

        } catch(error) {

            console.log(error);

            await this.$router.push('/login')

        }

    }

    function requestToken(email, pw) {
        return new Promise((resolve, reject) => {

            this.$axios.post(this.$config.server + '/user/token',
                {
                    email: email,
                    pw: pw
                })
                .then((response) => {

                    resolve({
                        result: response.data.result,
                        token: response.data.token
                    });

                })
                .catch((error) => reject(error));

        });
    }

    export default {
        data() {
            return {
                email: "",
                password: ""
            };
        },

        methods: {
            requestToken,
            clickLogin
        }
    }
</script>

<style scoped>
    .login-container {
        height: 100%;
        width: 100%;
        background-color: #253B80;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .login-dialog {
        width: 500px;
        height: 350px;
        background-color: #FAFAFA;
        border-radius: 10px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .dialog-title {
        font-size: 30px;
        font-weight: bolder;
        color: #253B80;
        margin-bottom: 30px;
    }

    .dialog-input {
        width: 400px;
        margin-bottom: 30px;
    }

    .dialog-button {
        display: flex;
        flex-direction: row;
    }
</style>
