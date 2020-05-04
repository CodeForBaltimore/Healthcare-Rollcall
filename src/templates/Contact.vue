<template>
  <b-container fluid="md" id="contact">
    <h1>Contact Information</h1>
    <b-row v-if="!$route.params.contactID">
      <b-col cols="6">
        <h4>Link existing contact</h4>
        <b-form @submit.prevent="submitExistingContact">
          <b-form-group label="Select existing contact" label-align="left">
            <b-input-group>
              <b-form-select required v-model="selectedContact.id" :options="contactSelectList"></b-form-select>
            </b-input-group>
          </b-form-group>
        <b-form-group id="relationship-title" label="Relationship to Facility">
          <b-form-input type="text" required v-model="selectedContact.relationshipTitle" />
        </b-form-group>
          <b-button
            type="submit"
            variant="primary"
          >Link Contact</b-button>
          <b-button
            type="cancel"
            variant="outline-secondary"
            @click.prevent="returnToFacility"
          >Cancel</b-button>
        </b-form>
      </b-col>
    </b-row>
    <br>

    <b-row>
      <b-col cols="6">
        <h4>Create new contact</h4>
        <b-form @submit.prevent="submitForm">
          <b-form-group id="contact-name" label="Name">
            <b-form-input type="text" required v-model="contact.name" />
          </b-form-group>
          <b-form-group id="contact-phone" label="Phone Number">
            <b-form-input
              type="tel"
              ref="contactPhone"
              v-model="numberFormatted"
              @keydown.exact="formatTelInput($event)"
              @keydown.delete.prevent="formatTelBackspace($event)"
              minlength="17"
              :state="phoneValid"
              aria-describedby="phone-input-live-feedback"
            />
            <b-form-invalid-feedback
              id="phone-input-live-feedback"
            >Please enter a valid phone number.</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="contact-email" label="Email Address">
            <b-form-input
              type="email"
              v-model="contact.email[0].address"
              :state="emailValid"
              aria-describedby="email-input-live-feedback"
            />
            <b-form-invalid-feedback
              id="email-input-live-feedback"
            >Please enter a valid email address.</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="contact-notes" label="Notes">
            <b-form-input type="text" v-model="contact.attributes.notes"/>
          </b-form-group>
          <b-button
            type="submit"
            variant="primary"
          >{{ this.$route.params.contactID ? 'Update Contact' : 'Create Contact' }}</b-button>
          <b-button
            type="cancel"
            variant="outline-secondary"
            @click.prevent="returnToFacility"
          >Cancel</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Contact",
  data() {
    return {
      contact: {
        id: null,
        UserId: null,
        name: null,
        phone: [
          {
            number: "1",
            isPrimary: true
          }
        ],
        email: [
          {
            address: "",
            isPrimary: true
          }
        ],
        attributes: {
          notes: ""
        },
      },
      numberFormatted: "",
      phoneValid: null,
      emailValid: null,
      validationRun: false,
      selectedContact: {
        id: null,
        relationshipTitle: "default",
      },
      contactSelectList: []
    };
  },
  methods: {
    updateContact(obj) {
      if (!obj.phone || obj.phone[0] === undefined || obj.phone[0] === null) {
        obj.phone = [];
        obj.phone.push({ number: "", isPrimary: true });
      }
      if (!obj.email || obj.email[0] === undefined || obj.email[0] === null) {
        obj.email = [];
        obj.email.push({ address: "", isPrimary: true });
      }
      this.contact = obj;

      if (this.contact.phone[0] === undefined || this.contact.phone[0].number ===  "") {
        if (
            this.contact.phone[0].number.length < 11 ||
            this.contact.phone[0].number.charAt(0) !== "1"
        ) {
          this.contact.phone[0].number = "1" + this.contact.phone[0].number;
        }
      }

      this.numberFormatted = this.$options.filters.phone(
        this.contact.phone[0].number
      );

      if (this.contact.attributes === null) {
        this.contact.attributes = {"notes":""};
      }
    },
    getContact(id) {
      this.$root.apiGETRequest("/contact/" + id, this.updateContact);
    },
    populateContactsDropdown(obj) {
      this.allContacts = obj.results;
      for (let contact_ of this.allContacts) {
        this.contactSelectList.push({ text: contact_.name + ", " + contact_.email[0].address, value: contact_.id });
      }
    },
    getAllContacts() {
      this.$root.apiGETRequest("/contact/", this.populateContactsDropdown)
    },
    returnToFacility() {
      this.$router.push({
        name: "facility",
        params: { entityID: this.$route.params.entityID }
      });
    },
    submitForm() {
      this.phoneValid = this.contact.phone[0].number.length > 10;
      this.emailValid =
        this.contact.email[0].address.includes("@") &&
        this.contact.email[0].address.includes(".");
      this.validationRun = true;
      if (
        (this.phoneValid && this.emailValid) ||
        (this.contact.phone[0].number === "1" && this.emailValid) ||
        (this.contact.email[0].address === "" && this.phoneValid)
      ) {
        let newContact = this.duplicateData(this.contact);
        if (this.contact.phone[0].number === "1") {
          newContact.phone = [];
        } else {
          newContact.phone = newContact.phone.filter(phone => !!phone.number);
          newContact.phone =
            newContact.phone.length > 0 ? newContact.phone : null;
        }
        newContact.email = newContact.email.filter(email => !!email.address);
        newContact.email =
          newContact.email.length > 0 ? newContact.email : null;
        newContact.entities = [{"id":this.$route.params.entityID}]
        if (this.contact.attributes === {"notes":""}) {
          newContact.attributes = null;
        }
        if (this.$route.params.contactID) {
          this.$root.apiPUTRequest(
            "/contact",
            newContact,
            this.returnToFacility
          );
        } else {
          this.$root.apiPOSTRequest(
            "/contact",
            newContact,
            this.returnToFacility
          );
        }
      }
    },
    submitExistingContact() {
      let body = {
        contacts: [
          {id: this.selectedContact.id, title: this.selectedContact.relationshipTitle}
        ]
      };
      this.$root.apiPOSTRequest(
        "/entity/link/" + this.$route.params.entityID,
        body,
        this.returnToFacility
      );
    },
    duplicateData(object) {
      return JSON.parse(JSON.stringify(object));
    },
    formatTelInput(event) {
      if (
        new RegExp(
          ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].join("|")
        ).test(event.key)
      ) {
        event.preventDefault();
        if (this.contact.phone[0].number == null) {
          this.contact.phone[0].number = "1";
        }
        if (this.contact.phone[0].number.charAt(0) === "1") {
          this.contact.phone[0].number += event.key;
          this.numberFormatted = this.$options.filters.phone(
            this.contact.phone[0].number
          );
        }
      } else if(event.key !== "Tab") {
        event.preventDefault();
      }
    },
    formatTelBackspace(event) {
      event.preventDefault();
      if (this.contact.phone[0].number > 1) {
        this.contact.phone[0].number = this.contact.phone[0].number.slice(
          0,
          -1
        );
        this.numberFormatted = this.$options.filters.phone(
          this.contact.phone[0].number
        );
      }
    }
  },
  mounted() {
    if (this.$route.params.contactID) {
      this.getContact(this.$route.params.contactID);
    } else {
      this.getAllContacts();
      this.numberFormatted = this.$options.filters.phone(
        this.contact.phone[0].number
      );
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: left;
}
form h5 {
  border-bottom: 2px solid #42484f;
  padding-bottom: 8px;
  margin: 16px 0;
}
form h6 {
  font-weight: bold;
  background-color: #f1f1f1;
  box-sizing: border-box;
  padding: 8px;
}
.card-body {
  text-align: left;
}
p.return-link {
  text-align: left;
}
.facility-check-in {
  margin-bottom: 24px;
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
</style>