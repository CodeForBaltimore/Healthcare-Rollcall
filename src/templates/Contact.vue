<template>
  <b-container fluid="md" id="contact">
    <h1>Contact Information</h1>

    <b-row v-if="!$route.params.contactID && $route.params.entityID">
      <b-col cols="12">
        <h4>Link existing contact</h4>
        <b-form @submit.prevent="submitExistingContact">
          <b-form-group label="Select existing contact" label-align="left">
            <Search-select
                v-model="selectedContact"
                :autocomplete="false"
                :options="contactSelectList"
                :close-on-select="true"
                :clear-on-select="true"
                :preserve-search="true"
                :hide-selected="true"
                label="name"
                track-by="id"
            ></Search-select>
          </b-form-group>
          <b-form-group id="relationship-title" label="Relationship to Facility">
            <b-form-input type="text" v-model="selectedContact.relationshipTitle"/>
          </b-form-group>
          <b-button
            type="submit"
            variant="primary"
            class="mr-2"
          >Link Contact</b-button>
          <b-button
              type="cancel"
              variant="outline-secondary"
              @click.prevent="returnToLastPage"
          >Cancel
          </b-button>
        </b-form>
      </b-col>
    </b-row>
    <br>

    <b-row>
      <b-col cols="12">
        <h4>{{ this.$route.params.contactID ? 'Update existing contact' : 'Create new contact' }}</h4>
        <b-form @submit.prevent="submitForm">
          <b-form-group id="contact-name" label="Name">
            <b-form-input type="text" required v-model="contact.name"/>
          </b-form-group>
          <b-form-group id="contact-phone" label="Phone Number">
            <b-form-input
                type="tel"
                ref="contactPhone"
                v-model="numberFormatted"
                @keydown.exact="formatTelInput($event)"
                @keydown.delete.prevent="formatTelBackspace($event)"
                minlength="10"
                :state="phoneValid"
                aria-describedby="phone-input-live-feedback"
            />
            <b-form-invalid-feedback
                id="phone-input-live-feedback"
            >Please enter a valid phone number.
            </b-form-invalid-feedback>
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
            >Please enter a valid email address.
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="contact-notes" label="Notes">
            <b-form-input type="text" v-model="contact.attributes.notes"/>
          </b-form-group>
          <b-button
            type="submit"
            variant="primary"
            class="mr-2 center"
          >{{ this.$route.params.contactID ? 'Update Contact' : 'Create Contact' }}</b-button>
          <b-button
              type="cancel"
              variant="outline-secondary"
              @click.prevent="returnToLastPage"
          >Cancel
          </b-button>
        </b-form>
      </b-col>
    </b-row>
    <br>

    <b-modal ref="unlink-entity" title="Unlink Entity" @ok="unlinkContact">
      <div class="d-block text-center">
        <p>
          Are you sure you want to unlink
          {{ this.contact ? this.contact.name : "this contact" }} from
          {{
            this.contact.entities.find(entity => entity.id === this.selectedEntityID)
              ? this.contact.entities.find(entity => entity.id === this.selectedEntityID).name
              : "this facility"
          }}?
        </p>
      </div>
    </b-modal>

    <b-row v-if="$route.params.contactID">
      <b-col cols="12" md="6">
        <h4>Linked Facilities</h4>
        <b-input-group v-if="contact.entities.length > 0">
          <ul id="linked-facilities">
            <li v-for="entity in entitySelectList" :key="entity.value">
              {{ entity.text }}
              
              <b-button
                type="submit"
                variant="light"
                size="sm"
                v-on:click="showUnlinkModal(entity.value)"
              >
              <b-icon-trash></b-icon-trash>
              <div class='sr-only'>Unlink from Contact</div>
              </b-button>
            </li>
          </ul>
        </b-input-group>
        <p v-if="contact.entities.length === 0">This contact has no linked facilities.</p>
        <br>
        <h4>Other Options</h4>
        <b-button
            type="submit"
            variant="primary"
            @click.prevent="deleteContact"
        >Delete Contact
        </b-button>
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
        entities: []
      },
      numberFormatted: "",
      phoneValid: null,
      emailValid: null,
      validationRun: false,
      selectedContact: {
        name: "",
        id: null,
        relationshipTitle: "default",
      },
      entitySelectList: [],
      contactSelectList: [],
      selectedEntityID: null,
    };
  },
  methods: {
    updateContact(obj) {
      if (!obj.phone || obj.phone[0] === undefined || obj.phone[0] === null) {
        obj.phone = [];
        obj.phone.push({number: "", isPrimary: true});
      }
      if (!obj.email || obj.email[0] === undefined || obj.email[0] === null) {
        obj.email = [];
        obj.email.push({address: "", isPrimary: true});
      }
      this.contact = obj;

      if (this.contact.phone[0] === undefined || this.contact.phone[0].number === "") {
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
        this.contact.attributes = {"notes": ""};
      }

      this.populateEntitiesDropdown();
    },
    getContact(id) {
      this.$root.apiGETRequest("/contact/" + id, this.updateContact);
    },
    populateEntitiesDropdown() {
      for (let entity_ of this.contact.entities) {
        this.entitySelectList.push({
          value: entity_.id,
          text: entity_.name
        })
      }
    },
    populateContactsDropdown(obj) {
      let emailDisplayed;
      this.allContacts = obj.results;
      for (let contact_ of this.allContacts) {
        if (!contact_.email) {
          emailDisplayed = "<email unknown>";
        } else {
          emailDisplayed = contact_.email[0].address;
        }
        this.contactSelectList.push(
            {
              name: contact_.name + ", " + emailDisplayed,
              id: contact_.id,
              relationshipTitle: "default"
            }
        );
      }
    },
    getAllContacts() {
      this.$root.apiGETRequest("/contact/", this.populateContactsDropdown)
    },
    returnToLastPage() {
      if (this.$route.name === "get-single-contact" || this.$route.name === "create-contact") {
        this.$router.push({
          name: "get-all-contacts",
          params: {entityID: this.$route.params.entityID}
        });
      } else {
        this.$router.push({
          name: "facility",
          params: {entityID: this.$route.params.entityID}
        });
      }

    },
    submitForm() {
      this.phoneValid = this.contact.phone[0].number.length >= 10;
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
        if (this.$route.params.entityID) {
          newContact.entities = [{"id": this.$route.params.entityID}]
        }
        if (this.contact.attributes === {"notes": ""}) {
          newContact.attributes = null;
        }
        if (this.$route.params.contactID) {
          this.$root.apiPUTRequest(
              "/contact",
              newContact,
              this.returnToLastPage
          );
        } else {
          this.$root.apiPOSTRequest(
              "/contact",
              newContact,
              this.returnToLastPage
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
          this.returnToLastPage
      );
    },
    showUnlinkModal(entityID) {
      this.selectedEntityID = entityID;
      this.$refs['unlink-entity'].show()
    },
    unlinkContact() {
      let body = {
        contacts: [
          {id: this.$route.params.contactID}
        ]
      };
      this.$root.apiPOSTRequest(
          "/entity/unlink/" + this.selectedEntityID,
          body,
          this.returnToLastPage
      )
    },
    deleteContact() {
      let deleteConfirm = confirm("Confirm delete of contact?")
      if (!deleteConfirm) {
        return
      }
      this.$root.apiDELRequest(
          "/contact/" + this.$route.params.contactID,
          {},
          this.returnToLastPage
      )
    },
    duplicateData(object) {
      return JSON.parse(JSON.stringify(object));
    },
    formatTelInput(event) {
      event.preventDefault();
      if (new RegExp("1|2|3|4|5|6|7|8|9|0").test(event.key)) {
        if (this.contact.phone[0].number == null) {
          this.contact.phone[0].number = "";
        }
        this.contact.phone[0].number += event.key;
        this.numberFormatted = this.$options.filters.phone(
            this.contact.phone[0].number
        );
      }
    },
    formatTelBackspace(event) {
      event.preventDefault();
      if (this.contact.phone[0].number.length > 0) {
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

<style lang="scss" scoped>
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
