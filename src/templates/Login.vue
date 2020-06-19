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
          <form class="login-container" v-on:submit.prevent="login">
            <label>
              <b-form-input
                required
                type="text"
                name="email"
                v-model="input.email"
                placeholder="Email"
              />
            </label>
            <label>
              <b-form-input
                required
                type="password"
                name="password"
                v-model="input.password"
                placeholder="Password"
              />
            </label>
            <div>
              <a v-b-modal.reset-pass href="#">Forgot/Reset Password</a>
            </div>
            <b-button type="submit" variant="primary">Login</b-button>
          </form>
        </b-card>
      </b-col>
    </b-row>
    <b-modal id="reset-pass" title="Reset Password" hide-footer>
      <p class="my-4">Please provide the email of the account to reset the password for:</p>
      <label>
        <b-form-input type="text" name="email" v-model="input.reset_email" placeholder="Email" />
      </label>
      <b-button type="submit" v-on:click="resetPass()" variant="primary">Reset Password</b-button>
      <b-alert
        :show="this.dismissCountDown"
        dismissible
        fade
        :variant="this.type"
        @dismiss-count-down="this.countDownChanged"
      >{{this.reset_alert}}</b-alert>
    </b-modal>
  </b-container>
</template>

<script>
import { postLogin, postReset } from "../utils/api";

export default {
  name: "Login",
  data() {
    return {
      input: {
        email: "",
        password: "",
        reset_email: ""
      },
      dismissSecs: 5,
      dismissCountDown: 0,
      reset_alert: "",
      type: "warning"
    };
  },
  created() {
    if (this.$root.getAuthenticationStatus()) {
      this.$router.replace({ name: "dashboard" });
    } else if (this.$root.getTokenFromCookie()) {
      this.$root.authenticateUser(this.$root.getTokenFromCookie());
      this.$router.replace({ name: "dashboard" });
    }
  },
  methods: {
    login() {
      if (this.input.email !== "" && this.input.password !== "") {
        const response = postLogin(this.input.email, this.input.password);
        response.then(data => {
          if (data.data) {
            this.$root.authenticateUser(data.data);
            this.$router.replace({ name: "dashboard" });
          } else {
            // eslint-disable-next-line no-console
            console.log("The email and / or password is incorrect");
          }
        });
      } else {
        // eslint-disable-next-line no-console
        console.log("A email and password must be present");
      }
    },
    resetPass() {
      if (this.input.reset_email !== "") {
        const response = postReset(this.input.reset_email);
        this.showAlert("Sending...")
        response
          .then(data => {
            if (data.status == 200) {
              this.showAlert("Password reset email sent!", "success");
            } else {
              this.showAlert("Failed sending email", "warning");
            }
          })
          .catch(() => {
            this.showAlert("Failed sending email", "warning");
          });
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert(msg, type) {
      this.reset_alert = msg;
      this.type = type;
      this.dismissCountDown = this.dismissSecs;
    }
  }
};
</script>

<style scoped>
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
