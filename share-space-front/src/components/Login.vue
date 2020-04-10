<template>
    <div class="login-container">

        <div class="login-card">

            <p class="sns-title">ShareSpace</p>

            <form class="login-form">
                <label>
                    <input type="email" class="form-control text-input" placeholder="Enter email" v-model="inputEmail">
                </label>
                <label>
                    <input type="password" class="form-control text-input" placeholder="Enter password" v-model="inputPassword">
                </label>

                <div class="login-form-button">
                    <button class="btn btn-primary" v-on:click.prevent="loginClicked">Login</button>
                    <button class="btn btn-primary" v-on:click.prevent="loginClicked">Sign Up</button>
                </div>
            </form>

        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import config from "../config";

    function getToken(email, pw) {
        return new Promise((resolve) => {

            axios.post(config.server + '/user/token', {
                email: email,
                pw: pw
            }).then((response) => {
                if(response.status === 200) {
                    console.log('Login Get Token Success');
                    localStorage.setItem('token', response.data.token);
                    resolve(true);
                } else { // error
                    console.log('Login Get Token Error');
                    resolve(false);
                }
            }).catch(() => resolve(false)); // wrong credential

        });
    }

    async function loginClicked() {

        if(this.inputEmail === '' || this.inputPassword === '') {
            alert('Empty email or password!');
            return;
        }

        const resultToken = await this.getToken(this.inputEmail, this.inputPassword);

        if(resultToken) await this.$router.push('/');
        else {
            alert('Login failed. Check email or password!');

            this.inputEmail = "";
            this.inputPassword = "";
        }

    }

    export default {
        data() {
            return {
                inputEmail: "",
                inputPassword: ""
            };
        },

        methods: {
            getToken,
            loginClicked
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

    .login-card {
        width: 500px;
        height: 350px;
        background-color: #FAFAFA;
        border-radius: 30px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .login-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .login-form-button {
        display: flex;
        flex-direction: row;
    }

    .sns-title {
        font-size: 30px;
        font-weight: bolder;
        color: #253B80;
        margin-bottom: 30px;
    }

    .text-input {
        width: 400px;
        margin-bottom: 30px;
    }
</style>
