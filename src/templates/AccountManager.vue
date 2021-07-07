<template>
  <b-container fluid="md" id="account-manager">
    <h1>Account Management</h1>
    <h4 class="text-muted">Add or update account information</h4>
    <b-row class="mt-4">
      <b-col cols="12">
        <b-form @submit.prevent="submitAccountUpdate">
          <b-form-group id="display-name" label="Name">
            <b-form-input type="text" required v-model="formValues.name" />
          </b-form-group>
          <b-form-group id="user-phone" label="Phone Number">
            <b-form-input
              type="tel"
              v-model="formControl.numberFormatted"
              @keydown.exact="formatTelInput($event)"
              @keydown.delete="formatTelBackspace($event)"
              minlength="10"
              :state="formControl.phoneValid"
              aria-describedby="phone-input-live-feedback"
            />
            <b-form-invalid-feedback id="phone-input-live-feedback"
              >Please enter a valid phone number.
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="user-email" label="Email Address">
            <b-form-input
              type="email"
              v-model="formValues.email"
              :state="formControl.emailValid"
              aria-describedby="email-input-live-feedback"
            />
            <b-form-invalid-feedback id="email-input-live-feedback"
              >Please enter a valid email address.
            </b-form-invalid-feedback>
          </b-form-group>
          <b-button type="submit" variant="primary" class="mr-2" @click.prevent="submitForm">
            Update
          </b-button>
          <b-button type="cancel" variant="outline-secondary" @click.prevent="returnToDashboard">
            Cancel
          </b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "AccountManager",
  data: () => ({
    formValues: {
      displayName: "",
      email: "",
      phone: "",
    },
    formControl: {
      phoneValid: null,
      emailValid: null,
      numberFormatted: "",
    },
  }),
  mounted() {
    const email = this.$jwt.decode(this.$root.auth_token).email;
    this.$root.apiGETRequest(`/user/${email}`, this.handleUserResponse);
  },
  methods: {
    returnToDashboard() {
      this.$router.push({ name: "dashboard" });
    },
    handleUserResponse(response) {
      this.formValues = {
        displayName: response.displayName ? response.displayName : "",
        email: response.email ? response.email : "",
        phone: response.phone ? response.phone : "",
      };
      this.formControl.numberFormatted = response.phone
        ? this.$options.filters.phone(response.phone)
        : "";
    },
    submitForm() {
      // Should the name field be required and have a validation for length > 0?
      // Should there be a confirmation message after successfully updating information
      // instead of pushing a user back to the dashboard?
      // Should a user be able to remove their phone number e.g. if phone.length === 0, send null?
      this.formControl.phoneValid = this.formValues.phone.length >= 10;
      this.formControl.emailValid =
        this.formValues.email.includes("@") && this.formValues.email.includes(".");
      if (this.formControl.phoneValid && this.formControl.emailValid) {
        const updatedUser = this.formValues;
        this.$root.apiPUTRequest("/user", updatedUser, this.returnToDashboard);
      }
    },
    formatTelInput(event) {
      event.preventDefault();
      if (new RegExp("1|2|3|4|5|6|7|8|9|0").test(event.key)) {
        if (this.formValues.phone === null) {
          this.formValues.phone = "";
        }
        this.formValues.phone += event.key;
        this.formControl.numberFormatted = this.$options.filters.phone(this.formValues.phone);
      }
    },
    formatTelBackspace(event) {
      event.preventDefault();
      if (this.formValues.phone.length > 0) {
        this.formValues.phone = this.formValues.phone.slice(0, -1);
        this.formControl.numberFormatted = this.$options.filters.phone(this.formValues.phone);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
