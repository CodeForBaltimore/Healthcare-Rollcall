<template>
  <div>
    <b-card title="Login">
      <form class="login-container" v-on:submit.prevent="login" data-test="login">
        <label>
          <b-form-input
            required
            type="text"
            name="email"
            v-model="input.email"
            placeholder="Email"
            data-test="email"
          />
        </label>
        <label>
          <b-form-input
            required
            type="password"
            name="password"
            v-model="input.password"
            placeholder="Password"
            data-test="password"
          />
        </label>
        <div>
          <a href="#" v-on:click="toggleModalShow">Forgot/Reset Password</a>
        </div>
        <b-button type="submit" variant="primary">Login</b-button>
        <alert v-bind:message="alertMessage" v-bind:type="alertType"/>
      </form>
    </b-card>
    <b-modal v-b-modal.modal-prevent-closing v-model="modalShow" title="Reset Password" hide-footer>
      <pasword-reset-request />
    </b-modal>
  </div>
</template>

<script>
import { postLogin } from "../../utils/api"
import PaswordResetRequest from "./PasswordResetRequest.vue"
import Alert from "./Alert.vue"

export default {
  name: "Login",
  components: {
    PaswordResetRequest,
    Alert
  },
  data() {
    return {
      input: {
        email: "",
        password: "",
      },
      alertMessage: "",
      alertType: "",
      modalShow: false
    }
  },
  methods: {
    toggleModalShow() {
      this.modalShow = !this.modalShow
    },
    login() {
      this.changeAlert("", "warning")
      if (this.input.email !== "" && this.input.password !== "") {
        const response = postLogin(this.input.email, this.input.password)
        response.then(data => {
          if (data.status === 200) {
            this.$root.authenticateUser(data.data)
            this.$router.replace({ name: "dashboard" })
          } else {
            this.changeAlert(data.message, "warning")
          }
        })
      } else {
        // eslint-disable-next-line no-console
        console.log("A email and password must be present")
      }
    },
    changeAlert(message, type) {
      this.alertMessage = message
      this.alertType = type
    }
  }
}
</script>


<style lang="scss" scoped>
.login-container {
  margin: auto;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 15px;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
}

.login-container button {
  margin-top: 15px;
  min-width: 40%;
}

label,
label input {
  width: 100% !important;
}

.login-container > input {
  margin-bottom: 10px;
}
</style>
