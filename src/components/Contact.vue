<template>
  <b-container fluid="md" id="contact">
    <h1>Contact Information</h1>
    <b-row>
      <b-col>
        <b-form @submit="submitForm" @submit.prevent="submit">
          <b-form-group id="contact-name" label="Name">
            <input required v-model="contact.name" />
          </b-form-group>
          <b-form-group id="contact-phone" label="Phone Number">
            <input v-model="contact.phone[0].number" />
          </b-form-group>
          <b-form-group id="contact-email" label="Email Address">
            <input v-model="contact.email[0].address" />
          </b-form-group>
          <b-button type="submit" variant="primary">{{ this.$route.params.contactID ? 'Update Contact' : 'Create Contact' }}</b-button>
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
        EntityId: this.$route.params.entityID,
        name: null,
        phone: [
          {
            phone: null,
            isPrimary: true
          }
        ],
        email: [
          {
            address: null,
            isPrimary: true
          }
        ]
      }
    };
  },
  methods: {
    updateContact(obj) {
      let tempObj = obj;
      if (!tempObj.phone || tempObj.phone.length === 0) {
        tempObj.phone = [{ phone: null, isPrimary: true }];
      }
      if (!tempObj.email || tempObj.email.length === 0) {
        tempObj.email = [{ address: null, isPrimary: true }];
      }
      this.contact = this.duplicateData(tempObj);
    },
    getContact(id) {
      this.$root.apiGETRequest("/contact/" + id, this.updateContact);
    },
    submitCallback() {
      this.$router.push('/facility/' + this.$route.params.entityID);
    },
    submitForm() {
      let newContact = this.duplicateData(this.contact)
      newContact.phone = newContact.phone.filter(phone => !!phone.number);
      newContact.phone = newContact.phone.length > 0 ? newContact.phone : null;
      newContact.email = newContact.email.filter(email => !!email.address);
      newContact.email = newContact.email.length > 0 ? newContact.email : null;
      if (this.$route.params.contactID) {
        this.$root.apiPUTRequest(
          "/contact",
          newContact,
          this.submitCallback
        );
      } else {
          this.$root.apiPOSTRequest(
          "/contact",
          newContact,
          this.submitCallback
        );
      }
    },
    duplicateData(object) {
      return JSON.parse(JSON.stringify(object));
    }
  },
  mounted() {
    if (this.$route.params.contactID) {
      this.getContact(this.$route.params.contactID);
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