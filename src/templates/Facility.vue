<template>
  <b-container fluid="md" id="facility">
    <div id="facility-header">
      <h1>{{ entity.name }}</h1>
      <sub>{{ entity.type }}</sub>
    </div>
    <b-row>
      <b-col cols="12" md="4" v-if="showDetails">
        <b-card title="Facility Information">
          <!-- Show Address if available -->
          <div v-if="entity.address" class="mb-2">
            <h6 class="card-subtitle mb2">Address</h6>
            <p>
              <span v-for="line in entity.address.street" v-bind:key="line" class="address-line">{{
                line
              }}</span>
              <span
                v-if="entity.address.city && entity.address.state && entity.address.zip"
                class="address-line"
                >{{ entity.address.city }}, {{ entity.address.state }}
                {{ entity.address.zip }}</span
              >
            </p>
          </div>
          <div v-if="entity.attributes" class="mb-2">
            <div v-if="entity.attributes.notes">
              <h6 class="card-subtitle mb2">Notes</h6>
              <p class="notes">{{ entity.attributes.notes }}</p>
            </div>
          </div>
          <b-button v-on:click="editFacility()">Edit Facility</b-button>
        </b-card>
        <br />
        <b-card title="Contact Information">
          <!-- Show Contacts if available -->
          <div v-if="entity.contacts && entity.contacts.length > 0" class="mb2">
            <div v-for="contact in entity.contacts" :key="`${contact.id}`" class="contact">
              <p>
                <router-link
                  :to="{
                    name: 'update-contact',
                    params: { entityID: entity.id, contactID: contact.id },
                  }"
                  >{{ contact.name }}</router-link
                >
              </p>
              <p v-if="contact.entityContacts !== null && contact.entityContacts.relationshipTitle">
                Role:
                <i>{{ contact.entityContacts.relationshipTitle }}</i>
              </p>
              <p v-if="contact.phone && contact.phone.length === 1">
                Phone:
                <a v-bind:href="'tel:' + contact.phone[0].number">{{
                  contact.phone[0].number | phone
                }}</a>
              </p>
              <p v-if="contact.email && contact.email.length === 1">
                Email:
                <a v-bind:href="'mailto:' + contact.email[0].address">{{
                  contact.email[0].address
                }}</a>
              </p>
              <div v-if="contact.attributes" class="mt-2 mb-2">
                <div v-if="contact.attributes.notes">
                  <h6 class="card-subtitle mb2">Notes</h6>
                  <p class="notes">
                    <i>{{ contact.attributes.notes }}</i>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <b-button class="mt-2" v-on:click="addContact()">Add Contact</b-button>
        </b-card>
        <br />
        <b-card title="Quick Check-In">
          <quick-form
            v-if="formAvailability.covidForm.includes(entity.type)"
            v-bind:entity.sync="entity"
            v-bind:entity-check-in.sync="entityCheckIn"
            @submitted="setLastCheckInData($event)"
          />
        </b-card>
      </b-col>
      <b-col cols="12" md="8" class="mt-3 mt-md-0">
        <b-row>
          <b-col>
            <h2>Begin New Check-In</h2>
            <ol>
              <li
                v-if="
                  entity.phone ||
                  (entity.contacts &&
                    entity.contacts[0] &&
                    entity.contacts[0].phone &&
                    entity.contacts[0].phone[0])
                "
              >
                Call the phone number
                <span v-if="entity.contacts[0].phone[0].number">{{
                  entity.contacts[0].phone[0].number | phone
                }}</span>
                <span v-else>{{ entity.phone[0].number | phone }}</span>
              </li>
              <li v-else>Contact the facility using the contact information to the left.</li>
              <li>Start the check-in by asking the 5 questions under &quot;New Check-in&quot;</li>
              <li>
                Once you are finished, click &quot;Submit Check-In&quot; at the bottom of the form
              </li>
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
                  <b-badge pill v-bind:variant="lastCheckInStatus.state">{{
                    lastCheckInStatus.status
                  }}</b-badge>
                </h5>
                <h6>Comments</h6>
                <p>{{ lastCheckIn.comments.value | nullToNone }}</p>
                <h6>Questionnaire</h6>
                <p>
                  <strong>Time of last check-in:</strong>
                  {{ lastCheckIn.date | timestamp }}
                </p>
                <b-button v-b-modal.checkin-detail-modal>Review check-in</b-button>
                <p>
                  Defaults to the most recent check-in. To view older check-ins please select one
                  from the list below then click the review button
                </p>
                <h6>Previous check-in's</h6>
                <b-table striped hover :items="entity.checkIn.checkIns" :fields="historyFields">
                  <template v-slot:cell(date)="data">
                    <b-button @click="setHistoricalData(data.item)">{{
                      formatDate(data.item.date)
                    }}</b-button>
                  </template>
                </b-table>
              </div>
            </b-card> </b-col
          >-
        </b-row>
        <b-row>
          <b-col>
            <b-card class="facility-check-in">
              <covid-form
                v-if="formAvailability.covidForm.includes(entity.type)"
                v-bind:entity.sync="entity"
                v-bind:entity-check-in.sync="entityCheckIn"
                @submitted="setLastCheckInData($event)"
              />

              <!-- If No Forms match the Entity Type -->
              <b-alert
                show
                variant="warning"
                v-if="!formAvailability.covidForm.includes(entity.type)"
              >
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
import covidForm from "../components/vaccForm";
import quickForm from "../components/quickForm";

export default {
  name: "Facility",
  components: {
    questionReadout,
    covidForm,
    quickForm,
  },
  data() {
    const validRoles = ["admin", "user"];
    const showDetails = validRoles.indexOf(this.$jwt.decode(this.$root.auth_token).type) > -1;
    return {
      historyFields: [
        {
          key: "status",
          sortable: true,
        },
        {
          key: "date",
          sortable: true,
          formatter: this.formatDate,
        },
      ],
      entity: {
        name: "Loading...",
      },
      entityCheckIn: {
        name: null,
      },
      lastCheckInStatus: {
        state: "dark",
        status: "Unknown",
      },
      formAvailability: {
        covidForm: ["Assisted Living Facility", "Mixed Housing", "Senior Housing"],
      },
      formMatched: false,
      lastCheckIn: null,
      history: null,
      showDetails,
    };
  },
  methods: {
    setHistoricalData(data) {
      this.lastCheckIn = this.duplicateData(data);
      this.lastCheckInStatus.status = data.status;

      switch (data.status) {
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
    formatDate(d) {
      const date = new Date(d);
      const options = {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "America/New_York",
      };
      const formatted = new Intl.DateTimeFormat("en-US", options).format(date);
      return formatted;
    },
    updateFacilityData(obj) {
      if (obj.checkIn === null) {
        this.entity = this.duplicateData(obj);
        this.entity.checkIn = {
          checkIns: [],
        };
        this.entityCheckIn = this.duplicateData(obj);
        this.entityCheckIn.checkIn = [];
      } else {
        this.entity = this.duplicateData(obj);
        this.entityCheckIn = this.duplicateData(obj);
        if (this.entityCheckIn.checkIn != null) {
          this.entityCheckIn.checkIn = this.duplicateData(this.entityCheckIn.checkIn.checkIns);
          this.setLastCheckInData();
        }
      }
      if (!obj.contacts || obj.contacts.length === 0) {
        let emptyContact = {
          phone: [],
          email: [],
        };
        this.entityCheckIn.contacts = [];
        this.entity.contacts = this.duplicateData(emptyContact);
        this.entityCheckIn.contacts.push(this.duplicateData(emptyContact));
      }
    },
    formAvailable(type = null, form = null) {
      if (type in this.formAvailability && !this.formMatched) {
        if (this.formAvailability[type].includes(form)) {
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
      this.$root.apiGETRequest("/entity/" + this.$route.params.entityID, this.updateFacilityData);
    },
    duplicateData(object) {
      return JSON.parse(JSON.stringify(object));
    },
    resetCheckInData() {
      // This prevents an event from being passed from the modal
      this.setLastCheckInData();
    },
    logout() {
      this.$root.destroySession();
      this.$router.push({ name: "login" });
    },
    setLastCheckInData(data = undefined, pos = undefined) {
      if (data) {
        this.entity.checkIn.checkIns.push(data);
      }
      if (
        this.entity.checkIn.checkIns[this.entity.checkIn.checkIns.length - 1] ||
        pos !== undefined
      ) {
        const postition = pos !== undefined ? pos : this.entity.checkIn.checkIns.length - 1;
        this.lastCheckIn = this.duplicateData(this.entity.checkIn.checkIns[postition]);
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
      this.$router.push({
        name: "link-contact",
        params: { entityID: this.$route.params.entityID },
      });
    },
    editFacility() {
      this.$router.push({
        name: "facility-edit",
        params: { entityID: this.$route.params.entityID },
      });
    },
  },
  created() {
    this.getEntity();
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: left;
  margin-bottom: 0px;
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
.notes {
  max-height: 6.5rem;
  overflow-y: auto;
  white-space: pre-line;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
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

#facility-header {
  margin-bottom: 25px;
}
</style>
