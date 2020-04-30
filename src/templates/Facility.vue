<template>
  <b-container fluid="md" id="facility">
    <h1>{{ entity.name }}</h1>
    <b-row>
      <b-col cols="12" md="4">
        <b-card title="Contact Information">
          <!-- Show Address if available -->
          <div v-if="entity.address" class="mb-2">
            <h6 class="card-subtitle mb2">Address</h6>
            <p>
              <span
                v-for="line in entity.address.street"
                v-bind:key="line"
                class="address-line"
              >{{ line }}</span>
              <span
                v-if="entity.address.city && entity.address.state && entity.address.zip"
                class="address-line"
              >{{ entity.address.city }}, {{ entity.address.state }} {{ entity.address.zip }}</span>
            </p>
          </div>
          <!-- Show Email Address if available -->
          <div v-if="entity.email" class="mb-2">
            <h6 class="card-subtitle mb-2">Email Addresses</h6>
            <p v-bind:class="{ primary: entity.email[0].isPrimary }">
              <a v-bind:href="'mailto:' +  entity.email[0].address">{{ entity.email[0].address }}</a>
            </p>
            <ol v-if="entity.email">
              <li
                v-for="address in entity.email"
                v-bind:key="address.address"
                v-bind:class="{ primary: address.isPrimary }"
              >
                <a v-bind:href="'mailto:' +  address.address">{{ address.address }}</a>
              </li>
            </ol>
          </div>

          <!-- Show Phone Numbers if available -->
          <div v-if="entity.phone" class="mb-2">
            <h6 class="card-subtitle mb2">Phone Numbers</h6>
            <p
              v-if="entity.phone"
              v-bind:class="{ primary: entity.phone[0].isPrimary }"
            >{{ entity.phone[0].number | phone }}</p>
            <ol v-if="entity.phone">
              <li
                v-for="number in entity.phone"
                v-bind:key="number.number"
                v-bind:class="{ primary: number.isPrimary }"
              >{{ number.number | phone }}</li>
            </ol>
          </div>

          <!-- Show Contacts if available -->
          <div v-if="entity.contacts && entity.contacts.length > 0" class="mb2">
            <h6 class="card-subtitle mb-2" v-if="entity.contacts.length > 0">Contacts</h6>
            <div v-if="entity.contacts.length === 1" class="contact">
              <p>
                <router-link
                        :to="{ name: 'update-contact', params: { entityID: entity.id, contactID: entity.contacts[0].id }}"
                >{{ entity.contacts[0].name }}</router-link>
              </p>
              <p
                v-if="entity.contacts[0].phone && entity.contacts[0].phone.length === 1"
              >
                Phone:
                <a
                  v-bind:href="'tel:' + entity.contacts[0].phone[0].number"
                >{{ entity.contacts[0].phone[0].number | phone }}</a>
              </p>
              <p
                v-if="entity.contacts[0].email && entity.contacts[0].email.length === 1"
              >
                Email:
                <a
                  v-bind:href="'mailto:' + entity.contacts[0].email[0].address"
                >{{ entity.contacts[0].email[0].address}}</a>
              </p>
            </div>
            <ul v-if="entity.contacts && entity.contacts.length > 1">
              <li v-for="contact in entity.contacts" v-bind:key="contact.id" class="contact">
                <router-link
                        :to="{ name: 'update-contact', params: { entityID: entity.id, contactID: contact.id }}"
                >{{ contact.name }}</router-link>
                <p v-if="contact.phone && contact.phone[0]">
                  Phone:
                  <a v-bind:href="'tel:' + contact.phone[0].number">{{ contact.phone[0].number | phone }}</a>
                </p>
                <p v-if="contact.email && contact.email[0]">
                    Email:
                    <a v-bind:href="'mailto:' +  contact.email[0].address">{{ contact.email[0].address }}</a>
                </p>
              </li>
            </ul>
          </div>
          <b-button v-on:click="addContact()">Add Contact</b-button>
        </b-card>
      </b-col>
      <b-col cols="12" md="8">
        <b-row>
          <b-col>
            <h2>Begin New Check-In</h2>
            <ol>
              <li
                v-if="entity.phone || (entity.contacts && entity.contacts[0] && entity.contacts[0].phone && entity.contacts[0].phone[0])"
              >
                Call the phone number
                <span
                  v-if="entity.contacts[0].phone[0].number"
                >{{ entity.contacts[0].phone[0].number | phone }}</span>
                <span v-else>{{ entity.phone[0].number | phone }}</span>
              </li>
              <li v-else>Contact the facility using the contact information to the left.</li>
              <li>Start the check-in by asking the 5 questions under &quot;New Check-in&quot;</li>
              <li>Once you are finished, click &quot;Submit Check-In&quot; at the bottom of the form</li>
              <li>Start the next provider</li>
            </ol>
            <b-card title="Previous Check-In" class="facility-check-in">
              <b-alert show variant="info" v-if="!lastCheckIn">
                <h6 class="alert-heading">Nothing to show</h6>
                <p>There are no check-ins on record for this facility.</p>
              </b-alert>
              <div v-if="lastCheckIn" class="last-checkin">
                <h5>
                  Status:
                  <b-badge
                    pill
                    v-bind:variant="lastCheckInStatus.state"
                  >{{ lastCheckInStatus.status }}</b-badge>
                </h5>
                <h6>Comments</h6>
                <p>{{ lastCheckIn.comments.value | nullToNone }}</p>
                <h6>Questionnaire</h6>
                <p>
                  <strong>Time of last check-in:</strong>
                  {{ lastCheckIn.date | timestamp }}
                </p>
                <b-button v-b-modal.checkin-detail-modal>Review previous checkin</b-button>
              </div>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card title="New Check-In" class="facility-check-in">
              <covid-form
                      v-if="formAvailability.covidForm.includes(entity.type)"
                      v-bind:entity.sync="entity"
                      v-bind:entity-check-in.sync="entityCheckIn"
                      @submitted="setLastCheckInData($event)"/>

              <!-- If No Forms match the Entity Type -->
              <b-alert show variant="warning" v-if="!formAvailability.covidForm.includes(entity.type)">
                <h6 class="alert-heading">No Forms Available</h6>
                <p>There are no forms available for this type of facility.</p>
              </b-alert>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-modal
      v-if="lastCheckIn"
      id="checkin-detail-modal"
      size="lg"
      v-bind:title="entity.name + ' Previous Check-In'"
      @hidden="resetCheckInData"
    >
      <div v-if="lastCheckIn.comments.value !== ''">
        <h5>Check-In Comments</h5>
        <p>{{ lastCheckIn.comments.value }}</p>
      </div>
      <hr />
      <h6>Check-In Time: {{ lastCheckIn.date | timestamp }}</h6>
      <hr />
      <question-readout
        v-for="(question, index) in lastCheckIn.questionnaire.questions"
        :question="question"
        :number="index"
        :key="index"
      />
      <template v-slot:modal-footer="{ close }">
        <b-button size="md" variant="primary" @click="close()">Close</b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
  import questionReadout from "../components/questionReadout";
  import covidForm from "../components/covidForm";

export default {
  name: "Facility",
  components: {
    questionReadout,
    covidForm
  },
  data() {
    return {
      entity: {
        name: "Loading..."
      },
      entityCheckIn: {
        name: null
      },
      lastCheckInStatus: {
        state: "dark",
        status: "Unknown"
      },
      formAvailability: {
        covidForm: [
          "Assisted Living Facility",
          "Nursing Homes",
          "Senior Housing",
          "Test"
        ]
      },
      formMatched: false,
      lastCheckIn: null
    };
  },
  methods: {
    updateFacilityData(obj) {
      if (obj.checkIn === null) {
        this.entity = this.duplicateData(obj);
        this.entity.checkIn = {
          checkIns: []
        };
        this.entityCheckIn = this.duplicateData(obj);
        this.entityCheckIn.checkIn = [];
      } else {
        this.entity = this.duplicateData(obj);
        this.entityCheckIn = this.duplicateData(obj);
        if (this.entityCheckIn.checkIn != null) {
          this.entityCheckIn.checkIn = this.duplicateData(
            this.entityCheckIn.checkIn.checkIns
          );
          this.setLastCheckInData();
        }
      }
      if (!obj.contacts || obj.contacts.length === 0) {
        let emptyContact = {
          phone: [],
          email: []
        };
        this.entityCheckIn.contacts = [];
        this.entity.contacts = this.duplicateData(emptyContact);
        this.entityCheckIn.contacts.push(this.duplicateData(emptyContact));
      }
    },
    formAvailable(type = null, form = null) {
      if(type in this.formAvailability && !this.formMatched) {
        if(this.formAvailability[type].includes(form)) {
          console.log("match found");
          this.formMatched = true;
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    getEntity() {
      this.$root.apiGETRequest(
        "/entity/" + this.$route.params.entityID,
        this.updateFacilityData
      );
    },
    duplicateData(object) {
      return JSON.parse(JSON.stringify(object));
    },
    resetCheckInData() {
      // This prevents an event from being passed from the modal
      this.setLastCheckInData();
    },
    setLastCheckInData(data = undefined) {
      if(data) {
        this.entity.checkIn.checkIns.push(data);
      }
      if (
        this.entity.checkIn.checkIns[this.entity.checkIn.checkIns.length - 1]
      ) {
        this.lastCheckIn = this.duplicateData(
          this.entity.checkIn.checkIns[this.entity.checkIn.checkIns.length - 1]
        );
        this.lastCheckInStatus.status = this.lastCheckIn.status;
      }

      switch (this.lastCheckInStatus.status) {
        case "Spoke to owner. No follow-up needed.":
          this.lastCheckInStatus.state = "success";
          break;
        case "Spoke to someone besides owner. No follow-up needed.":
          this.lastCheckInStatus.state = "success";
          break;
        case "Spoke to owner. Follow-up needed.":
          this.lastCheckInStatus.state = "warning";
          break;
        case "Spoke to someone besides owner. Follow-up needed.":
          this.lastCheckInStatus.state = "warning";
          break;
        case "Called. No answer. Left a message.":
          this.lastCheckInStatus.state = "danger";
          break;
        case "Called. No answer. Did not leave a message.":
          this.lastCheckInStatus.state = "danger";
          break;
        case "Wrong number":
          this.lastCheckInStatus.state = "danger";
          break;
      }
    },
    addContact() {
      this.$router.push({ name: 'create-contact', params: { entityID: this.$route.params.entityID }});
    }
  },
  created() {
    this.getEntity();
  }
};
</script>

<style scoped>
  h1 {
    text-align: left;
    margin-bottom: 30px;
  }
  .card h6 {
    font-weight: bold;
  }
  .last-checkin p {
    padding: 0 8px;
  }
  .card-body {
    text-align: left;
  }
  p.return-link {
    text-align: left;
  }
  .contact p {
    margin: 0;
  }
  .address-line {
    display: block;
  }
  .alert {
    margin-bottom: 0;
  }
  .alert h6 {
    font-weight: bold;
    margin-top: 4px;
  }
  p:last-child {
    margin-bottom: 0;
  }
  .custom-control-label {
    cursor: pointer;
  }
  button {
    margin-right: 15px;
  }
  button.btn-primary {
    padding-left: 30px;
    padding-right: 30px;
  }
  .facility-check-in {
    margin-bottom: 24px;
  }
</style>
