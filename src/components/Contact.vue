<template>
  <b-container fluid="md" id="contact">
    <h1>Contact Information</h1>
    <b-row>
      <b-col>
        <!-- Contacts Table -->
        <!--<b-table
          id="contacts-table"
          striped
          hover
          :items="contacts"
          :fields="['name', 'phone', 'email']"
        >
          <template v-slot:cell(name)="data">{{ data.item }}</template>
          <template
            v-slot:cell(phone)="data"
          >{{ data.item.phone && data.item.phone.length > 0 ? data.item.phone[0].number : '' }}</template>
          <template
            v-slot:cell(email)="data"
          >{{ data.item.email && data.item.email.length > 0 ? data.item.email[0].address : '' }}</template>
        </b-table>
        <b-pagination
          v-model="table.currentPage"
          :total-rows="table.rows"
          :per-page="10"
          aria-controls="contacts-table"
        ></b-pagination>-->

        <b-form @submit="submitForm">
          <b-form-group id="contact-name" label="Name">
            <input v-model="contact.name" placeholder="John Doe" />
          </b-form-group>
          <b-form-group id="contact-phone" label="Phone Number">
            <input v-model="contact.phone[0].number" placeholder="1234567890" />
          </b-form-group>
          <b-form-group id="contact-email" label="Email Address">
            <input v-model="contact.email[0].address" placeholder="john@doe.com" />
          </b-form-group>
          <b-button type="submit" variant="primary">Create Contact</b-button>
          <b-button type="reset" variant="outline-secondary">Reset</b-button>
        </b-form>
        <p>{{ contact }}</p>
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
        EntityId: null,
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
      console.log(obj);
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
    submitCallback(response) {
      console.log(response);
      this.getContact();
    },
    submitForm() {
      if (this.$route.params.contactID) {
        this.$root.apiPUTRequest(
          "/contact",
          this.contact,
          this.submitCallback
        );
      } else {
          this.$root.apiPOSTRequest(
          "/contact",
          this.contact,
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