<template>
  <div>
    <h5>{{ formName }}</h5>
    <b-form @submit.prevent="addNewCheckin" v-if="showForm">
      <h5>Comments</h5>
      <b-form-group
        id="check-in-input-comments"
        v-bind:label="newCheckIn.comments.label"
        label-for="comments"
      >
        <p class="pi-alert">
          <span v-if="elementFocus === 'comments'">
            <img alt="Alert Icon" src="../assets/exclamation-triangle-solid.svg" />
            <strong>Remember:</strong> Do not include any personal information
          </span>
        </p>
        <b-form-textarea
          id="comments"
          v-model="newCheckIn.comments.value"
          placeholder="Response"
          @focus="elementFocus = 'comments'"
          @blur="elementFocus = 'null'"
          rows="3"
        ></b-form-textarea>
      </b-form-group>
      <h5>Call Outcome &amp; Follow-up</h5>
      <b-form-group
        id="check-in-input-status"
        label="Choose an outcome and indicate if a follow-up is needed"
      >
        <b-form-radio
          required
          v-model="newCheckIn.status"
          name="question-status"
          value="Spoke to owner. No follow-up needed."
        >Spoke to owner. No follow-up needed.</b-form-radio>
        <b-form-radio
          required
          v-model="newCheckIn.status"
          name="question-status"
          value="Spoke to owner. Follow-up needed."
        >Spoke to owner. Follow-up needed.</b-form-radio>
        <hr />
        <b-form-radio
          required
          v-model="newCheckIn.status"
          name="question-status"
          value="Spoke to someone besides owner. No follow-up needed."
        >Spoke to someone besides owner. No follow-up needed.</b-form-radio>
        <b-form-radio
          required
          v-model="newCheckIn.status"
          name="question-status"
          value="Spoke to someone besides owner. Follow-up needed."
        >Spoke to someone besides owner. Follow-up needed.</b-form-radio>
        <hr />
        <b-form-radio
          required
          v-model="newCheckIn.status"
          name="question-status"
          value="Called. No Answer. Left a message."
        >Called. No Answer. Left a message.</b-form-radio>
        <b-form-radio
          required
          v-model="newCheckIn.status"
          name="question-status"
          value="Called. No Answer. Did not leave a message."
        >Called. No Answer. Did not leave a message.</b-form-radio>
        <b-form-radio
          required
          v-model="newCheckIn.status"
          name="question-status"
          value="Wrong number"
        >Wrong Number</b-form-radio>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit Check-In</b-button>
    </b-form>

    <b-alert show variant="success" v-if="!showForm">
      <h6 class="alert-heading">Check-In Complete</h6>
      <p>The form was successfully saved for {{ entity.name }}.</p>
    </b-alert>
    <b-button v-if="!showForm" v-on:click="toggleForm">Submit Another</b-button>
  </div>
</template>

<script>
export default {
  name: "covidForm",
  props: ["entity", "entityCheckIn"],
  data() {
    return {
      formName: "COVID-19 Response",
      elementFocus: null,
      newCheckIn: {
        status: null,
        date: null,
        questionnaire: {
          questions: [
            {
              parts: [
                {
                  label:
                    'Have you seen the recommendations by the State called the "Recommendations for infection control & prevention of COVID-19 in facilities serving older adults"?',
                  value: [null]
                }
              ]
            },
            {
              parts: [
                {
                  label: "Is your location limiting visitors?",
                  value: [null]
                },
                {
                  label: "How many patients do you have at your facility?",
                  value: [null]
                },
                {
                  label:
                    "Are they actively screening and monitoring for those who are sick for both those who are patients and employees? (looking for signs/symptoms of cough fever, shortness of breath or taking temperatures)",
                  value: [null]
                },
                {
                  label: "Has your location stopped having congregate meals?",
                  value: [null]
                },
                {
                  label: "Has your location posted signs for handwashing?",
                  value: [null]
                }
              ]
            },
            {
              parts: [
                {
                  label:
                    "How is your facility handling leave of absences from nursing homes (i.e. doctor's visits, dialysis, and outside medical visits)?",
                  value: [null]
                }
              ]
            },
            {
              parts: [
                {
                  label:
                    "We would like to send you more materials. What is the best way? (Fax number or email)",
                  value: [null]
                }
              ]
            },
            {
              parts: [
                {
                  label: "Do you need any additional supplies?",
                  value: [null, null, null]
                },
                {
                  label: "Other issues or needs (i.e. PPE)",
                  value: [null]
                }
              ]
            }
          ]
        },
        comments: {
          label: "Any comments?",
          value: null
        }
      },
      showForm: true
    };
  },
  methods: {
    formatDate(d) {
      const date = new Date(d);
      const options = {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "America/New_York"
      };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    },
    resetCheckin() {
      this.newCheckIn.questionnaire.questions[0].parts[0].value[0] = null;
      this.newCheckIn.questionnaire.questions[1].parts[0].value[0] = null;
      this.newCheckIn.questionnaire.questions[1].parts[1].value[0] = null;
      this.newCheckIn.questionnaire.questions[1].parts[2].value[0] = null;
      this.newCheckIn.questionnaire.questions[1].parts[3].value[0] = null;
      this.newCheckIn.questionnaire.questions[1].parts[4].value[0] = null;
      this.newCheckIn.questionnaire.questions[2].parts[0].value[0] = null;
      this.newCheckIn.questionnaire.questions[3].parts[0].value[0] = null;
      this.newCheckIn.questionnaire.questions[4].parts[0].value[0] = null;
      this.newCheckIn.questionnaire.questions[4].parts[0].value[1] = null;
      this.newCheckIn.questionnaire.questions[4].parts[0].value[2] = null;
      this.newCheckIn.questionnaire.questions[4].parts[1].value[0] = null;
      this.newCheckIn.comments.value = null;
      this.newCheckIn.status = null;
    },
    addNewCheckin() {
      let self = this;
      this.showForm = false;
      this.newCheckIn.date = new Date();
      this.entityCheckIn.checkIn = this.newCheckIn;
      this.$root.apiPUTRequest("/entity", this.entityCheckIn, function() {
        self.updateParent();
      });
      const token = this.$jwt.decode(this.$root.auth_token)
      if (token.type === 'contact') {
        this.$root.destroySession();
        this.$router.push({ name: "login" });
      }
    },
    updateParent() {
      this.$emit("submitted", this.newCheckIn);
    },
    toggleForm() {
      this.resetCheckin();
      this.showForm = true;
    }
  }
};
</script>

<style scoped>
form h5 {
  border-bottom: 2px solid #42484f;
  padding-bottom: 8px;
  margin: 16px 0;
}
form h6,
.last-checkin h6 {
  font-weight: bold;
  background-color: #f1f1f1;
  box-sizing: border-box;
  padding: 8px;
}
.pi-alert {
  font-size: 12px;
  margin-top: 0;
  height: 18px;
  margin-bottom: 4px;
}
.pi-alert img {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  margin-top: -2px;
}
label {
  margin-bottom: 0;
}
button {
  margin-right: 15px;
}
button.btn-primary {
  padding-left: 30px;
  padding-right: 30px;
}
.card h6 {
  font-weight: bold;
}
</style>