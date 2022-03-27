<template>
  <div>
    <p class="my-4">Please provide the email of the account to reset the password for:</p>
    <form class="login-container" v-on:submit.prevent="resetPass" data-test="reset-password-submit">
      <label>
        <b-form-input type="text" name="email" v-model="input.reset_email" placeholder="Email" data-test="reset-email" required/>
      </label>
      <b-button type="submit" variant="primary">Reset Password</b-button>
    </form>
    <alert v-bind:message="alertMessage" v-bind:type="alertType" data-test="reset-password-alert"/>
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
    async resetPass() {
      if (this.input.reset_email !== "") {
        try {
          this.changeAlert("Sending", "warning")
          const response = await postReset(this.input.reset_email)
          if (response.status != 200) {
            throw Error()
          }
          this.changeAlert("Password reset email sent!", "success")
        } catch {
          this.changeAlert("Failed sending email", "warning")
        }
      }
    },
    changeAlert(message, type) {
      this.alertMessage = message
      this.alertType = type
    }
  }
}
</script>