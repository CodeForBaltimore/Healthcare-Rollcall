<template>
  <div id="checkins">
    <form v-on:submit.prevent>
      <h1>Complete the questionnaire</h1>
      <fieldset>
        <legend>Have you seen the recommendations by the State called the RECOMMENDATIONS FOR INFECTION CONTROL & PREVENTION OF COVID-19 IN FACILITIES SERVING OLDER ADULTS?</legend>
        <input id="yes" type="radio" name="answer" v-model="checkedResponse" required />
        <label for="yes">Yes</label>
        <input id="no" type="radio" name="answer" v-model="checkedResponse" required />
        <label for="no">No</label>
      </fieldset>
      <fieldset>
        <legend>Is your location limiting visitors? b. Are they actively screening and monitoring for those who are sick for both those who are patients and employees?</legend>
        <input id="yes" type="radio" name="answer" v-model="checkedResponse" required />
        <label for="yes">Yes</label>
        <input id="no" type="radio" name="answer" v-model="checkedResponse" required />
        <label for="no">No</label>
      </fieldset>
      <fieldset>
        <legend>Are they actively screening and monitoring for those who are sick for both those who are patients and employees?</legend>
        <input id="yes" type="radio" name="answer" v-model="checkedResponse" required />
        <label for="yes">Yes</label>
        <input id="no" type="radio" name="answer" v-model="checkedResponse" required />
        <label for="no">No</label>
      </fieldset>
      <fieldset>
        <legend>Has your location stopped having congregate meals?</legend>
        <input id="yes" type="radio" name="answer" v-model="checkedResponse" required />
        <label for="yes">Yes</label>
        <input id="no" type="radio" name="answer" v-model="checkedResponse" required />
        <label for="no">No</label>
      </fieldset>
      <fieldset>
        <legend>Has your location posted signs for handwashing?</legend>
        <input id="yes" type="radio" name="answer" v-model="checkedResponse" required />
        <label for="yes">Yes</label>
        <input id="no" type="radio" name="answer" v-model="checkedResponse" required />
        <label for="no">No</label>
      </fieldset>
      <fieldset>
        <legend>How is your facility handling leave of absences from nursing homes (i.e. doctor's visits, dialysis, and outside medical visits)?</legend>
        <input id="yes" type="radio" name="answer" v-model="checkedResponse" required />
        <label for="yes">Yes</label>
        <input id="no" type="radio" name="answer" v-model="checkedResponse" required />
        <label for="no">No</label>
      </fieldset>
      <fieldset>
        <legend>We would like to send you more materials. What is the best way?</legend>
        <label for="fax">Fax number:</label>
        <input
          v-model.number="fax"
          type="tel"
          id="fax"
          name="faxnumber"
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
        />
        <label for="email">Enter your email:</label>
        <input type="email" id="email" name="email" />
      </fieldset>
      <fieldset>
        <legend>Note any issues or needs</legend>
        <label for="notes"></label>
        <textarea id="notes" v-model="specialRequests" placeholder="Add any notes here..."></textarea>
      </fieldset>
      <button type="reset" class="reset">Reset</button>
      <button type="submit" v-on:click="submit()">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Checkins",
  data() {
    return {};
  },
  methods: {
    reset() {
      // is this necessary?
    },
    submit() {
      // where is this going?
    }
  }
};
</script>