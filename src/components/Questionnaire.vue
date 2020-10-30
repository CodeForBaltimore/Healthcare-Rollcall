<template>
  <div>
    <div v-for="(questionnaire, index) in questionnaires" :key="index">
      <b-form @submit="submitQuestionnaire" v-if="questionnaire.questions">
        <b-form-group
          v-for="(question, index) in questionnaire.questions"
          :key="index"
        >
          <label> {{ question.questionText }}</label>
          <b-form-radio-group
            :required="question.required ? true : false"
            v-if="question.responseType === 'single-select'"
          >
            <div
              v-for="(response, index) in question.validResponses"
              :key="index"
            >
              <b-radio value="response">{{ response }}</b-radio>
            </div>
          </b-form-radio-group>
          <b-form-checkbox-group
            :required="question.required ? true : false"
            v-if="question.responseType === 'multi-select'"
          >
            <div
              v-for="(response, index) in question.validResponses"
              :key="index"
            >
              <b-checkbox value="response">{{ response }}</b-checkbox>
            </div>
          </b-form-checkbox-group>
          <b-form-input
            :required="question.required ? true : false"
            v-if="question.responseType === 'short-text'"
          ></b-form-input>
          <b-form-textarea
            :required="question.required ? true : false"
            v-if="question.responseType === 'long-text'"
          ></b-form-textarea>
        </b-form-group>
      </b-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "questionnaire",
  props: ["questionnaires"],
  data() {},
  methods: {
    submitQuestionnaire(questionnaire) {
      console.log(questionnaire);
      //Wait for endpoint to implement
      //   this.$root.apiPOSTRequest("/endpoint", "payload", "callback");
    },
  },
  created() {},
};
</script>