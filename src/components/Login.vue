<template>
  <div id="login" class="login-container">
    <h1>Login</h1>
    <input type="text" name="email" v-model="input.email" placeholder="Email" />
    <input type="password" name="password" v-model="input.password" placeholder="Password" />
    <button type="button" v-on:click="login()">Login</button>
  </div>
</template>

<script>
  import {postLogin} from '../utils/api';

  export default {
    name: 'Login',
    data() {
      return {
        input: {
          email: "",
          password: ""
        }
      }
    },
    methods: {
      login() {
        if(this.input.email !== "" && this.input.password !== "") {
          //TODO: call API here
          const response = postLogin(this.input.email, this.input.password);
          console.log(response);
          if(this.input.email === this.$parent.mockAccount.email && this.input.password === this.$parent.mockAccount.password) {
            this.$emit("authenticated", true);
            this.$router.replace({ name: "hello" });
          } else {
            // eslint-disable-next-line no-console
            console.log("The email and / or password is incorrect");
          }
        } else {
          // eslint-disable-next-line no-console
          console.log("A email and password must be present");
        }
      }
    }
  }
</script>

<style scoped>
  #login {
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
  }
  .login-container {
    margin: auto;
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .login-container > input {
    margin-bottom: 10px;
  }
</style>
