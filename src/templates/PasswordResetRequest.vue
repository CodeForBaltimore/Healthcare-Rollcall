<template>
  <div>
    <p class="my-4">Please provide the email of the account to reset the password for:</p>
    <label>
      <b-form-input type="text" name="email" v-model="input.reset_email" placeholder="Email" data-test="reset-email" />
    </label>
    <b-button type="submit" v-on:click="resetPass()" variant="primary" data-test="reset-password-submit">Reset Password</b-button>
    <b-alert
      :show="this.dismissCountDown"
      dismissible
      fade
      :variant="this.type"
      @dismiss-count-down="this.countDownChanged"
    >{{this.resetAlert}}</b-alert>
  </div>
</template>

<script>
import { postReset } from '../utils/api'

export default {
  name: "PasswordResetRequest",

  data() {
    return {
      input: {
        reset_email: ""
      },
      dismissSecs: 5,
      dismissCountDown: 0,
      dismissLoginCountDown: 0,
      type: "warning",
      resetAlert: ""
    }
  },

  methods: {
    resetPass() {
      if (this.input.reset_email !== "") {
        const response = postReset(this.input.reset_email)
        this.showAlert("Sending...")
        response
          .then(data => {
            if (data.status == 200) {
              this.showAlert("Password reset email sent!", "success")
            } else {
              this.showAlert("Failed sending email", "warning")
            }
          })
          .catch(() => {
            this.showAlert("Failed sending email", "warning")
          })
      }
    },
    showAlert(msg, type) {
      this.resetAlert = msg
      this.dismissCountDown = this.dismissSecs
      this.type = type
    },
    countDownChanged(newCountdown) {
      this.dismissCountDown = newCountdown
    },
  }
}
</script>