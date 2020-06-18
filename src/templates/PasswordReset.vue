<template>
  <div id="reset">
    <h1>Password Reset</h1>
    <p>Your password must be at least 8 characters long and contain the following:</p>
    <ul>
      <li>at least one upper-case letter</li>
      <li>at least one lower-case letter</li>
      <li>at least one special character</li>
      <li>at least one number</li>
    </ul>
    <form class="reset-container" v-on:submit.prevent>
      <label>
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
      </label>
      <b-button type="submit" v-on:click="resetPass()">Reset Password</b-button>
    </form>
    <b-alert
        :show="this.dismissCountDown"
        dismissible
        fade
        variant="danger"
        @dismiss-count-down="this.countDownChanged"
      >{{this.alert_msg}}</b-alert>
  </div>
</template>

<script>
import { updateUser } from "../utils/api";

export default {
  name: "PasswordReset",
  data() {
    return {
      input: {
        email: "",
        password: ""
      },
      dismissSecs: 5,
      dismissCountDown: 0,
      alert_msg: ""
    };
  },
  mounted() {
      this.input.email = this.$jwt.decode(this.$route.params.token).email
  },
  methods: {
    resetPass() {
      if (this.input.email != "" && this.input.password !== "") {
        const response = updateUser(this.$route.params.token, this.input.email, this.input.password);
        response
          .then((data) => {
              if(data.status == 200){
                this.$router.replace({ name: "login" });
              }else{
                  this.showAlert("Failed updating password");
              }
          });
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert(msg) {
      this.alert_msg = msg;
      this.dismissCountDown = this.dismissSecs;
    }
  }
};
</script>

<style scoped>
#reset {
  width: 500px;
  background-color: #ffffff;
  margin: auto;
  padding: 20px;
}
.reset-container {
  margin: auto;
  margin-bottom: 1rem;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reset-container > input {
  margin-bottom: 10px;
}
</style>
