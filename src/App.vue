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
import { mapActions } from "vuex";

export default {
  name: "App",
  computed: mapState({
    auth_token: "auth"
  }),
  data() {
    return {
      authenticated: false
    }
  },
  mounted() {
    if(this.$cookies.isKey('Health_Auth')){
      this.authenticate(this.$cookies.get('Health_Auth'));
      this.authenticated = true;
    }
    if (!this.authenticated) {
      this.$router.replace({ name: "login" });
    }else{
      this.$router.replace({name: 'dashboard'});
    }
  },
  methods: {
    ...mapActions(["unsetAuth", "authenticate"]),
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.unsetAuth();
      this.authenticated = false;
      this.$cookies.remove('Health_Auth');
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
