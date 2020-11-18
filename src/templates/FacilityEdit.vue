<template>
  <b-container fluid="md" id="entity">
    <h1>Facility Information</h1>
    <b-row>
      <b-col cols="12">
        <h4>{{ this.$route.params.entityID ? 'Update facility' : 'Create facility' }}</h4>
        <b-form @submit.prevent="submitForm">
          <b-form-group id="entity-name" label="Name">
            <b-form-input type="text" required v-model="entity.name" />
          </b-form-group>
          <b-form-group id="entity-address" label="Address">
            <b-form-input type="text" v-model="entity.address.street[0]" placeholder="Street" />
            <b-form-input type="text" v-model="entity.address.city" placeholder="City" />
            <b-form-select v-model="stateSelected" :options="stateOptions"></b-form-select>
            <b-form-input type="text" v-model="entity.address.zip" placeholder="Zip" />
          </b-form-group>
          <b-form-group id="entity-type" label="Type">
            <b-form-select v-model="typeSelected" required :options="typeOptions"></b-form-select>
          </b-form-group>
          <b-form-group id="entity-notes" label="Notes">
            <b-form-input type="text" v-model="entity.attributes.notes" />
          </b-form-group>
          <b-button
            type="submit"
            variant="primary"
          >{{ this.$route.params.entityID ? 'Update facility' : 'Create facility' }}</b-button>
          <b-button
            type="cancel"
            variant="outline-secondary"
            class="ml-2"
            @click.prevent="returnToLastPage"
          >Cancel</b-button>
        </b-form>
      </b-col>
    </b-row>
    <br />

    <b-modal ref="unlink-entity" title="Unlink Entity" @ok="unlinkEntity">
      <div class="d-block text-center">
        <p>
          Are you sure you want to unlink
          {{ 
            entity.contacts.some(contact => contact.id === this.selectedContactID) ? 
              entity.contacts.find(contact => contact.id === this.selectedContactID).name 
              : 'this contact' 
          }} from {{ this.entity.name || 'this facility' }}?
        </p>
      </div>
    </b-modal>

    <b-row v-if="$route.params.entityID">
      <b-col cols="12" md="6">
        <h4>Linked Contacts</h4>
        <b-input-group v-if="entity.contacts.length > 0">
          <b-form-select v-model="selectedContactID" :options="contactSelectList"></b-form-select>
          <b-button
            type="submit"
            variant="primary"
            class="ml-2"
            :disabled="!selectedContactID"
            @click.prevent="showUnlinkModal"
          >Unlink from Facility</b-button>
        </b-input-group>
        <p v-if="entity.contacts.length === 0">This facility has no linked contact.</p>
        <br />
        <div v-if="showAdmin">
          <h4>Admin Options</h4>
          <b-button type="submit" variant="primary" @click.prevent="deleteFacility">Delete Facility</b-button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Entity",
  data() {
    const showAdmin =
      this.$jwt.decode(this.$root.auth_token).type === "admin" ? true : false
    return (
      {
        entity: {
          id: null,
          name: null,
          address: {
            street: [""],
            city: "",
            state: "",
            zip: ""
          },
          attributes: {
            notes: ""
          },
          contacts: []
        },
        showAdmin,
        contactSelectList: [{ value: null, text: "Contacts Linked" }],
        selectedContactID: null,
        stateSelected: "MD",
        stateOptions: [{ value: "MD", text: "Maryland" }],
        typeSelected: null,
        typeOptions: [
          { value: null, text: "Select facility type" },
          {
            value: "Assisted Living Facility",
            text: "Assisted Living Facility"
          },
          { value: "Mixed Housing", text: "Mixed Housing" },
          { value: "Senior Housing", text: "Senior Housing" }
        ]
      }
    )
  },
  methods: {
    updateEntity(obj) {
      this.entity = obj

      this.stateSelected = this.entity.address.state
      this.typeSelected = this.entity.type
      if (this.entity.attributes === null) {
        this.entity.attributes = { notes: "" }
      }

      this.populateContactsDropdown()
    },
    getEntity(id) {
      this.$root.apiGETRequest("/entity/" + id, this.updateEntity)
    },
    populateContactsDropdown() {
      for (let contact_ of this.entity.contacts) {
        this.contactSelectList.push({
          value: contact_.id,
          text: contact_.name
        })
      }
    },
    returnToLastPage() {
      if (this.$route.params.entityID) {
        this.$router.push({
          name: "facility",
          params: { entityID: this.$route.params.entityID }
        })
      } else {
        this.$router.push({
          name: "dashboard"
        })
      }
    },
    submitForm() {
      this.validationRun = true
      if (this.typeSelected !== null) this.entity.type = this.typeSelected
      this.entity.address.state = this.stateSelected
      let newEntity = this.duplicateData(this.entity)

      if (this.$route.params.entityID) {
        this.$root.apiPUTRequest("/entity", newEntity, this.returnToLastPage)
      } else {
        this.$root.apiPOSTRequest("/entity", newEntity, this.returnToLastPage)
      }
    },
    duplicateData(object) {
      return JSON.parse(JSON.stringify(object))
    },
    showUnlinkModal() {
      this.$refs['unlink-entity'].show()
    },
    unlinkEntity() {
      let body = {
        entities: [{ id: this.$route.params.entityID }]
      }
      this.$root.apiPOSTRequest(
        "/contact/unlink/" + this.selectedContactID,
        body,
        this.returnToLastPage
      )
    },
    deleteFacility() {
      let deleteConfirm = confirm("Confirm delete of facility?")
      if (!deleteConfirm) {
        return
      }
      this.$root.apiDELRequest(
        "/entity/" + this.$route.params.entityID,
        this.$router.push({
          name: "dashboard"
        })
      )
    }
  },
  mounted() {
    if (this.$route.params.entityID) {
      this.getEntity(this.$route.params.entityID)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/styles/variables';

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

form {
  fieldset#entity-address {
    input, select {
      margin-bottom: $inputMargin;
    }
    input:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
