<template>
  <b-container fluid="md" id="login">
    <b-row>
      <b-col cols="12" md="6">
        <h1>Welcome to Healthcare Roll Call</h1>
        <h4 class="text-muted">Check-in for Healthcare Providers</h4>
        <p class="lead">
          <strong>Healthcare Roll Call</strong> allows municipalities to keep track of the status of local healthcare providers connectivity and emergency-related needs. The
          <strong>Healthcare Roll Call</strong> collects and consolidates all emergency information in one database, allowing outreach coordinators to easily track provider status.
        </p>
      </b-col>
      <b-col cols="12" md="6">
        <h3>
          Loading
          <span class="one">.</span>
          <span class="two">.</span>
          <span class="three">.</span>
        </h3>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "CheckIn",
  data() {
    return {};
  },
  created() {
    // if (this.$root.getAuthenticationStatus()) {
    //   this.$router.replace({ name: "dashboard" });
    // } else if (this.$root.getTokenFromCookie()) {
    //   this.$root.authenticateUser(this.$root.getTokenFromCookie());
    //   this.$router.replace({ name: "dashboard" });
    // }
    if (this.$route.query.token !== undefined) {
      this.$root.authenticateUser(this.$route.query.token);
      this.$router.replace({
        path: `/facility/${this.$route.params.entityId}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  background-color: #ffffff;
  margin: auto;
  padding: 20px;
}
.login-container {
  margin: auto;
  margin-bottom: 1rem;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#login .login-container {
  text-align: left;
  margin: 0;
  margin-top: 15px;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
}

.login-container button {
  margin-top: 15px;
  min-width: 40%;
}

#login label,
#login label input {
  width: 100% !important;
}

.login-container > input {
  margin-bottom: 10px;
}
h1 {
  font-size: 36px !important;
}
.one {
  opacity: 0;
  -webkit-animation: dot 1.3s infinite;
  -webkit-animation-delay: 0s;
  animation: dot 1.3s infinite;
  animation-delay: 0s;
}

.two {
  opacity: 0;
  -webkit-animation: dot 1.3s infinite;
  -webkit-animation-delay: 0.2s;
  animation: dot 1.3s infinite;
  animation-delay: 0.2s;
}

.three {
  opacity: 0;
  -webkit-animation: dot 1.3s infinite;
  -webkit-animation-delay: 0.3s;
  animation: dot 1.3s infinite;
  animation-delay: 0.3s;
}

@-webkit-keyframes dot {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes dot {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
