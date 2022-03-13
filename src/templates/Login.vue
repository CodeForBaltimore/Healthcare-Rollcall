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
        <h5>30 Second Tutorial</h5>
        <iframe
          src="https://docs.google.com/presentation/d/e/2PACX-1vQ3Um0pjz8HmUj44qOJ8x0r-P7NUR1kNAYmOCkry8KXcwScoQjmrJ1EMuSVIEsnJOW0GeKXZtN7uAjM/embed?start=true&loop=true&delayms=3000"
          frameborder="0"
          width="480"
          height="299"
          allowfullscreen="true"
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          style="max-width:100%;"
        ></iframe>
      </b-col>
      <b-col cols="12" md="6">
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
            <b-alert
              :show="this.dismissLoginCountDown"
              dismissible
              fade
              :variant="this.type"
              @dismiss-login-count-down="this.countDownChanged"
            >{{this.login_alert}}</b-alert>
          </form>
        </b-card>
      </b-col>
    </b-row>
    <b-modal v-b-modal.modal-prevent-closing v-model="modalShow" title="Reset Password" hide-footer>
      <pasword-reset-request />
    </b-modal>
  </b-container>
</template>

<script>
import { postLogin } from "../utils/api"
import PaswordResetRequest from "./PasswordResetRequest.vue"

export default {
  name: "Login",
  components: {
    PaswordResetRequest
  },
  data() {
    return {
      input: {
        email: "",
        password: "",
      },
      dismissSecs: 5,
      dismissCountDown: 0,
      dismissLoginCountDown: 0,
      reset_alert: "",
      login_alert: "",
      type: "warning",
      modalShow: false
    }
  },
  created() {
    if (this.$root.getAuthenticationStatus()) {
      this.$router.replace({ name: "dashboard" })
    } else if (this.$root.getTokenFromCookie()) {
      this.$root.authenticateUser(this.$root.getTokenFromCookie())
      this.$router.replace({ name: "dashboard" })
    }
  },
  methods: {
    toggleModalShow() {
      this.modalShow = !this.modalShow
    },
    login() {
      if (this.input.email !== "" && this.input.password !== "") {
        const response = postLogin(this.input.email, this.input.password)
        response.then(data => {
          if (data.status === 200) {
            this.$root.authenticateUser(data.data)
            this.$router.replace({ name: "dashboard" })
          } else {
            this.showAlert(
              data.message,
              "warning"
            )
          }
        })
      } else {
        // eslint-disable-next-line no-console
        console.log("A email and password must be present")
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert(msg, type, alertType = null) {
      if (alertType !== null) {
      this.reset_alert = msg
      this.dismissCountDown = this.dismissSecs
      } else {
        this.login_alert = msg
      this.dismissLoginCountDown = this.dismissSecs
      }
      this.type = type
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
</style>
