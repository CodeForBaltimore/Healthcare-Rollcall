<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/CfB.png" />
    <div id="nav">
      <a href="#" v-if="isAuthenticated()" v-on:click.prevent="logout()">Logout</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "App",
    created() {
      if(!this.isAuthenticated() && this.$root.getTokenFromCookie()) {
        this.$root.authenticateUser(this.$root.getTokenFromCookie());
      }
    },
    methods: {
      isAuthenticated() {
        return this.$root.getAuthenticationStatus();
      },
      logout() {
        this.$root.logout();
        this.$router.replace({ name: "login" });
      }
    }
  };
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  margin: auto;
}

body {
  background-color: #f0f0f0;
}
h1 {
  padding: 0;
  margin-top: 0;
}

#app img {
  max-width: 25vw;
  min-width: 200px;
}
</style>
