<template>
  <div id="login" >
    <h1>Login</h1>
    <form class="login-container" v-on:submit.prevent>
      <label>
        <input type="text" name="email" v-model="input.email" placeholder="Email" />
      </label>
      <label>
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
      </label>
      <button type="submit" v-on:click="login()">Login</button>
    </form>
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
          const response = postLogin(this.input.email, this.input.password);
          response.then((data)  => {
            if (data.status === 200) { //TODO: store JWT and check it here instead of 200
              this.$emit("authenticated", true);
              this.$router.replace({name: "hello"});
            } else {
              // eslint-disable-next-line no-console
              console.log("The email and / or password is incorrect");
            }
          })
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
