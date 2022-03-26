<template>
  <b-container fluid="md" id="login">
    <b-row>
      <b-col cols="12" md="6">
        <description/>
        <tutorial/>
      </b-col>
      <b-col cols="12" md="6">
        <login/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Tutorial from "./Tutorial.vue"
import Description from "./Description.vue"
import Login from "./Login.vue"

export default {
  name: "Home",
  components: {
    Tutorial,
    Description,
    Login
  },
  created() {
    if (this.$root.getAuthenticationStatus()) {
      this.$router.replace({ name: "dashboard" })
    } else if (this.$root.getTokenFromCookie()) {
      this.$root.authenticateUser(this.$root.getTokenFromCookie())
      this.$router.replace({ name: "dashboard" })
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
  background-color: #ffffff;
  margin: auto;
  padding: 20px;
}
</style>
