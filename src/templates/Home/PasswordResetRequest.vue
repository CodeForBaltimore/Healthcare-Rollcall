<template>
  <div data-test="password-reset-request">
    <p class="my-4">Please provide the email of the account to reset the password for:</p>
    <label>
      <b-form-input type="text" name="email" v-model="input.reset_email" placeholder="Email" data-test="reset-email" />
    </label>
    <b-button type="submit" v-on:click="resetPass()" variant="primary" data-test="reset-password-submit">Reset Password</b-button>
    <alert v-bind:message="alertMessage" v-bind:type="alertType"/>
  </div>
</template>

<script>
import { postReset } from '../../utils/api'
import Alert from "./Alert.vue"

export default {
  name: "PasswordResetRequest",

  components: {
    Alert
  },

  data() {
    return {
      input: {
        reset_email: ""
      },
      dismissSecs: 5,
      dismissCountDown: 0,
      dismissLoginCountDown: 0,
      alertType: "",
      alertMessage: ""
    }
  },

  methods: {
    resetPass() {
      if (this.input.reset_email !== "") {
        const response = postReset(this.input.reset_email)
        this.changeAlert("Sending", "warning")
        response
          .then(data => {
            if (data.status == 200) {
              this.changeAlert("Password reset email sent!", "success")

            } else {
              this.changeAlert("Failed sending email", "warning")
            }
          })
          .catch(() => {
            this.changeAlert("Failed sending email", "warning")
          })
      }
    },
    changeAlert(message, type) {
      this.alertMessage = message
      this.alertType = type
    }
  }
}
</script>