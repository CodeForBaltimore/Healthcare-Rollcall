<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/CfB.png" />
    <div id="nav">
      <b-button variant="link" v-if="this.$root.auth_state" v-on:click="logout()">Logout</b-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "App",
    methods: {
      logout() {
        this.$root.destroySession();
        this.$router.push({ name: "login" });
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
