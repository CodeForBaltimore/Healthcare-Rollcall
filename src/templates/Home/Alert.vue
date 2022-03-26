<template>
  <b-alert
    :show="this.visibleSecondsLeft"
    dismissible
    fade
    :variant="this.type"
    @dismiss-count-down="this.countDownChanged"
  >
    {{this.message}}
  </b-alert>
</template>

<script>
export default {
  name: "Alert",
  props: {
    message: String,
    type: String,
  },

  data() {
    return {
      visibleAlertLength: 5,
      visibleSecondsLeft: 0,
    }
  },

  methods: {
    countDownChanged(newCountdown) {
      this.visibleSecondsLeft = newCountdown
    },
    showAlert() {
      if (this.message.length > 0) {
        this.visibleSecondsLeft = this.visibleAlertLength
      }
    }
  },

  watch: {
    message: 'showAlert'
  }
}
</script>