<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/CfB.png" />
    <div>{{auth_token}}</div>
    <div id="nav">
      <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
    </div>
    <router-view @authenticated="setAuthenticated" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      authenticated: () =>{
          if(this.auth_token){
              return true
          }else{
              return false
          }
      }
    };
  },
  computed: mapState({
    auth_token: "auth"
  }),
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
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
