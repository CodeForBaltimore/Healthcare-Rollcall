<template>
  <div id="login" class="login-container">
    <h1>Login</h1>
    <input type="text" name="username" v-model="input.username" placeholder="Username" />
    <input type="password" name="password" v-model="input.password" placeholder="Password" />
    <button type="button" v-on:click="login()">Login</button>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        input: {
          username: "",
          password: ""
        }
      }
    },
    methods: {
      login() {
        if(this.input.username !== "" && this.input.password !== "") {
          //TODO: call API here
          if(this.input.username === this.$parent.mockAccount.username && this.input.password === this.$parent.mockAccount.password) {
            this.$emit("authenticated", true);
            this.$router.replace({ name: "secure" });
          } else {
            // eslint-disable-next-line no-console
            console.log("The username and / or password is incorrect");
          }
        } else {
          // eslint-disable-next-line no-console
          console.log("A username and password must be present");
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
