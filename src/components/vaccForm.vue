<template>
  <div>
    <h3>{{ formName }}</h3>
    <b-form @submit.prevent="addNewCheckin" @reset="resetCheckin" v-if="showForm">
      <p>Please respond to the following questions so that the Baltimore City Health Department can understand and support your Covid-19 vaccinations needs. Click "Submit Check-In" once you are done.</p>
      <h5>Question 1</h5>
      <h6>Part A</h6>
      <b-form-group
        id="check-in-input-question-1a"
        v-bind:label="newCheckIn.questionnaire.questions[0].parts[0].label"
      >
        <b-form-input
          id="question-1a"
          type="number"
          v-model="newCheckIn.questionnaire.questions[0].parts[0].value[0]"
          placeholder="0"
          min="0"
        ></b-form-input>
      </b-form-group>
      <h6>Part B</h6>
      <b-form-group
        id="check-in-input-question-1b"
        v-bind:label="newCheckIn.questionnaire.questions[0].parts[1].label"
      >
        <b-form-input
          id="question-1b"
          type="number"
          v-model="newCheckIn.questionnaire.questions[0].parts[1].value[0]"
          placeholder="0"
          min="0"
        ></b-form-input>
        </b-form-group>
      <h6>Part C</h6>
      <b-form-group
        id="check-in-input-question-1c"
        v-bind:label="newCheckIn.questionnaire.questions[0].parts[2].label"
      >
        <b-form-input
          id="question-1c"
          type="number"
          v-model="newCheckIn.questionnaire.questions[0].parts[2].value[0]"
          placeholder="0"
          min="0"
        ></b-form-input>
      </b-form-group>

    <h5>Question 2</h5>
    <h6>Part A</h6>
      <b-form-group
        id="check-in-input-question-2a"
        v-bind:label="newCheckIn.questionnaire.questions[1].parts[0].label"
      >
         <b-form-radio
            v-model="newCheckIn.questionnaire.questions[1].parts[0].value[0]"
            name="question-2a-radio"
            value="Yes"
          >Yes</b-form-radio>
          <b-form-radio
            v-model="newCheckIn.questionnaire.questions[1].parts[0].value[0]"
            name="question-2a-radio"
            value="No"
          >No</b-form-radio>
          <b-form-radio
            v-model="newCheckIn.questionnaire.questions[1].parts[0].value[0]"
            name="question-2a-radio"
            value="I don't know"
          >I don't know</b-form-radio>
      </b-form-group>
    <h6>Part B</h6>
      <b-form-group
        id="check-in-input-question-2b"
        v-bind:label="newCheckIn.questionnaire.questions[1].parts[1].label"
      >
        <b-form-radio
            v-model="newCheckIn.questionnaire.questions[1].parts[1].value[0]"
            name="question-2b-radio"
            value="Walgreens"
          >Walgreens</b-form-radio>
          <b-form-radio
            v-model="newCheckIn.questionnaire.questions[1].parts[1].value[0]"
            name="question-2b-radio"
            value="CVS"
          >CVS</b-form-radio>
          <b-form-radio
            v-model="newCheckIn.questionnaire.questions[1].parts[1].value[0]"
            name="question-2b-radio"
            value="Not Applicable"
          >Not Applicable</b-form-radio>
      </b-form-group> 
    <h6>Part C</h6>
      <b-form-group
        id="check-in-input-question-2c"
        v-bind:label="newCheckIn.questionnaire.questions[1].parts[2].label"
        label-for="question-2c"
      >
        <p class="pi-alert">
          <span v-if="elementFocus === 'question-2c'">
            <img alt="Alert Icon" src="../assets/exclamation-triangle-solid.svg" />
            <strong>Remember:</strong> Do not include any personal information
          </span>
        </p>
        <b-form-textarea
          id="question-2c"
          v-model="newCheckIn.questionnaire.questions[1].parts[2].value[0]"
          placeholder="Response"
          @focus="elementFocus = 'question-2c'"
          @blur="elementFocus = 'null'"
          rows="1"
        ></b-form-textarea>
      </b-form-group>
    <h5>Question 3</h5>
    <h6>Part A</h6>
    <b-form-group
        id="check-in-input-question-3a"
        v-bind:label="newCheckIn.questionnaire.questions[2].parts[0].label"
      >
         <b-form-radio
            v-model="newCheckIn.questionnaire.questions[2].parts[0].value[0]"
            name="question-3a-radio"
            value="Yes"
          >Yes</b-form-radio>
          <b-form-radio
            v-model="newCheckIn.questionnaire.questions[2].parts[0].value[0]"
            name="question-3a-radio"
            value="No"
          >No</b-form-radio>
          <b-form-radio
            v-model="newCheckIn.questionnaire.questions[2].parts[0].value[0]"
            name="question-3a-radio"
            value="I don't know"
          >I don't know</b-form-radio>
      </b-form-group>
    <h6>Part B</h6>
    <b-form-group
        id="check-in-input-question-3b"
        v-bind:label="newCheckIn.questionnaire.questions[2].parts[1].label"
      >
         <b-form-radio
            v-model="newCheckIn.questionnaire.questions[2].parts[1].value[0]"
            name="question-3b-radio"
            value="Yes"
          >Yes</b-form-radio>
          <b-form-radio
            v-model="newCheckIn.questionnaire.questions[2].parts[1].value[0]"
            name="question-3b-radio"
            value="No"
          >No</b-form-radio>
          <b-form-radio
            v-model="newCheckIn.questionnaire.questions[2].parts[1].value[0]"
            name="question-3b-radio"
            value="I don't know"
          >I don't know</b-form-radio>
      </b-form-group>
    <h6>Part C</h6>
    <b-form-group
        id="check-in-input-question-3c"
        v-bind:label="newCheckIn.questionnaire.questions[2].parts[2].label"
      >
         <b-form-radio
            v-model="newCheckIn.questionnaire.questions[2].parts[2].value[0]"
            name="question-3c-radio"
            value="Yes"
          >Yes</b-form-radio>
          <b-form-radio
            v-model="newCheckIn.questionnaire.questions[2].parts[2].value[0]"
            name="question-3c-radio"
            value="No"
          >No</b-form-radio>
          <b-form-radio
            v-model="newCheckIn.questionnaire.questions[2].parts[2].value[0]"
            name="question-3c-radio"
            value="I don't know"
          >I don't know</b-form-radio>
      </b-form-group>
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

      <h5 v-if="showDetails">Call Outcome &amp; Follow-up</h5>
      <b-form-group v-if="showDetails"
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


      <h5 v-if="!showDetails">Follow-up</h5>
      <b-form-group v-if="!showDetails"
        id="check-in-input-status"
        label="Do you need us to follow up with you?"
      >
        <b-form-radio
          required
          v-model="newCheckIn.status"
          name="question-status"
          value="Spoke to owner. No follow-up needed."
        >No follow-up needed.</b-form-radio>
        <b-form-radio
          required
          v-model="newCheckIn.status"
          name="question-status"
          value="Spoke to owner. Follow-up needed."
        >Yes, follow-up needed.</b-form-radio>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit Check-In</b-button>
      <b-button type="reset" variant="outline-secondary">Reset</b-button>
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
  name: "vaccForm",
  props: ["entity", "entityCheckIn"],
  data() {
    const validRoles = ["admin", "user"];
    const showDetails =
      validRoles.indexOf(this.$jwt.decode(this.$root.auth_token).type) > -1;
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
                    'How many residents are currently at this factility?',
                  value: [null]
                },
                {
                  label:
                    'How many staff currently work at this factility?',
                  value: [null]
                },
                 {
                  label:
                    'Of those residents and staff, how many still need a Covid-19 vaccine?',
                  value: [null]
                }
              ]
            },
             {
              parts: [
                {
                  label:
                    'Have you been contacted by a federal or hospital partner to administer vaccines?',
                  value: [null]
                },
                {
                  label: 'Please select the name of the federal partner. Note: If you have two contacts, you can specify the second contact on the next question.',
                  value: [null]
                },
                {
                  label: 'Please indicate any other ways that residents and staff have received vaccines, or any information about issues with obtaining enough vaccines.',
                  value: [null]
                }
              ]
            },
            {
              parts: [
                {
                  label: 'Does your facility have clinical staff to administer vaccines?',
                  value: [null]
                },
                {
                  label: 'Does your facility have technology to pre-register residents/clients for vaccine?',
                  value: [null]
                },
                {
                  label: 'If available, are you interested in onsite vaccination thru BCHD mobile team?',
                  value: [null]
                }
              ]
            }
          ]
        },
        comments: {
          label: "Any additional comments?",
          value: null
        }
      },
      showForm: true,
      showDetails
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
      this.newCheckIn.questionnaire.questions[0].parts[1].value[0] = null;
      this.newCheckIn.questionnaire.questions[0].parts[2].value[0] = null;
      this.newCheckIn.questionnaire.questions[1].parts[0].value[0] = null;
      this.newCheckIn.questionnaire.questions[1].parts[1].value[0] = null;
      this.newCheckIn.questionnaire.questions[1].parts[2].value[0] = null;
      this.newCheckIn.questionnaire.questions[2].parts[0].value[0] = null;
      this.newCheckIn.questionnaire.questions[2].parts[1].value[0] = null;
      this.newCheckIn.questionnaire.questions[2].parts[2].value[0] = null;
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
      const token = this.$jwt.decode(this.$root.auth_token);
      if (token.type === "contact") {
        setTimeout(() => {
          this.$root.destroySession();
          this.$router.push({ name: "login" });
        }, 5000);
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

<style lang="scss" scoped>
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
