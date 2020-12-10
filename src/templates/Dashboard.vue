<template>
  <b-container fluid="md" id="dashboard">
    <b-row>
      <b-col cols="12">
        <h1>Provider Status Dashboard</h1>
        <h4 class="text-muted">Status &amp; Check-in Starting Point</h4>
        <p
            class="lead"
        >Choose a Provider from the list below to begin Check-in. You can edit all provider info once inside their
          page.</p>
        <!-- Dashboard Table -->
        <b-row>
          <b-col cols="4">
            <b-form-group label="Filter" label-align="left">
              <b-input-group>
                <b-form-input
                    v-model="filter.keyword"
                    type="search"
                    id="dashboard-table"
                    placeholder="Type to Search"
                ></b-form-input>
                <b-input-group-append>
                  <b-button
                      :disabled="!filter.keyword"
                      @click="filter.keyword = ''"
                      variant="outline-primary"
                  >Clear
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-form-group label="Status" label-align="left" label-for="dashboard-table">
              <b-input-group>
                <b-form-select v-model="filter.status" :options="statusOptions"></b-form-select>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="5" class="align--right mt-3 btn--container">
            <b-button v-if="showAdmin" v-on:click="addFacility()">Create Facility</b-button>
            <b-button v-if="showAdmin" class="ml-1" v-on:click="downloadCSV()">Download CSV</b-button>
            <b-button v-if="showAdmin || showUser" @click="actionedFacility = null" class="ml-1" v-b-modal.email-facility-modal>
              Email 
              {{ selectedEntityIds.length ? 'Selected' : '' }}
              Facilities
            </b-button>
          </b-col>
          <div>
            <b-modal id="email-facility-modal" title="Send Emails to Facilities" ok-title="Send" @ok="sendEmails">              
              <div v-if="selectedEntityIds.length || actionedFacility">
                Are you sure you want to send an email to the contacts of the following facilities?
                <ul>
                  <template v-if="actionedFacility">
                    <li>{{ actionedFacility.name }}</li>
                  </template>
                  <template v-else>
                    <li v-for="(entityName, i) in entities.filter(entity => selectedEntityIds.includes(entity.id)).map(entity => entity.name).sort()" :key="i">
                      <div>{{ entityName }}</div>
                    </li>
                  </template>
                </ul>
              </div>
              <div v-else>
                <b-form-group label="Select a facility type to send bulk emails" label-align="left">
                  <b-form-radio v-for="(type, i) in facilityTypes" required :key="i" v-model="facilityTypeSelected"
                                v-bind:value="type">{{ type }}
                  </b-form-radio>
                  <p class="error" v-if="showEmailErr">Type is required</p>
                </b-form-group>
              </div>
            </b-modal>
          </div>
        </b-row>
        <b-table
            ref="entityTable" 
            id="dashboard-table"
            striped
            hover
            :per-page="perPage"
            :current-page="currentPage"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @filtered="onFiltered"
            :items="entities"
            :filter="filter"
            :filter-function="filterRow"
            :fields="[
            {
              key: 'checkbox', stickyColumn: true,
            },
            {
              key: 'name', stickyColumn: true, isRowHeader: true,
              sortable: true
            },
            {
              key: 'type', stickyColumn: true,
              sortable: true
            },
            {
              key: 'status',
              sortable: true
            },
            {
              key: 'updatedAt',
              label: 'Updated',
              sortable: true,
              formatter: value => {
                return this.$options.filters.timestamp(value);
              }
            },
            {
              key: 'actions',
              label: 'Actions',
              sortable: false
            }
          ]"
        >
          <template v-slot:head(checkbox)>
            <b-form-checkbox
              name="selectEntityAll"
              v-bind:value='true'
              v-model='selectAllEntities'
              id="selectEntityAll" 
              @change="selectEntityAllClick"
            >
              <span class='sr-only'>
                Select all
              </span>
            </b-form-checkbox>
          </template>
          <template v-slot:cell(checkbox)="data">
            <b-form-checkbox
              name="selectEntity"
              v-model="selectedEntityIds"
              :value='data.item.id'
              @change="selectEntityClick"
            >
              <span class='sr-only'>
                Select {{ data.item.name }}
              </span>
            </b-form-checkbox>
          </template>
          <template v-slot:cell(name)="data">
            <router-link
                :to="{ name: 'facility', params: { entityID: data.item.id }}"
            >{{ data.item.name }}
            </router-link>
          </template>
          <template v-slot:cell(type)="data">{{ data.item.type }}</template>
          <template v-slot:cell(status)="data">
            <span>{{ data.item.status }}</span>
          </template>
          <template v-slot:cell(actions)="data">
            <div class="tableIcons">
              <a v-if="showAdmin" class="clickable">
                <router-link
                  :to="{ name: 'facility-edit', params: { entityID: data.item.id }}"
                >
                  <b-icon-pencil></b-icon-pencil>
                  <span class="sr-only">Edit {{ data.item.name }}</span>
                </router-link>
              </a>
              <a v-if="showAdmin" class="clickable" @click="actionedFacility = data.item" v-b-modal.email-facility-modal>
                <b-icon-envelope-fill></b-icon-envelope-fill>
                <span class="sr-only">Send an email to {{ data.item.name }}</span>
              </a>
            </div>
          </template>
        </b-table>
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" class="mt-4"></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import { FACILITY_TYPE_ALL } from '../constants/facilities.const'

export default {
  name: "Dashboard",
  data() {
    const showAdmin =
        this.$jwt.decode(this.$root.auth_token).type === "admin" ? true : false
    const showUser =
        this.$jwt.decode(this.$root.auth_token).type === "user" ? true : false

    return {
      rows: 0,
      perPage: 25,
      currentPage: 1,
      filter: {
        keyword: null,
        status: null
      },
      actionedFacility: null,
      filterOn: ["name"],
      statusOptions: [],
      showAdmin,
      showUser,
      facilityTypes: [FACILITY_TYPE_ALL],
      facilityTypeSelected: FACILITY_TYPE_ALL,
      showEmailErr: false,
      entities: null,
      selectedEntityIds: [],
      selectAllEntities: false,
      sortBy: "updated",
      sortDesc: false,
      sortDirection: "asc",
      fields: [
        {key: "name", sortable: true},
        {key: "status", sortable: true},
        {key: "updatedAt", sortable: true}
      ]
    }
  },
  methods: {
    updateEntities(obj) {
      this.entities = obj.results
      this.rows = this.entities.length
      for (let entity of this.entities) {
        if (
            entity.checkIn &&
            entity.checkIn.checkIns &&
            entity.checkIn.checkIns.length > 0
        ) {
          entity.status =
              entity.checkIn.checkIns[entity.checkIn.checkIns.length - 1].status
        } else {
          entity.status = "No Previous Check-in"
        }
      }
      this.updateFacilityTypesList();
    },
    updateFacilityTypesList() {
      // Get all unique facility types from the list of facilities, sort aphabetically, and then append them to an "All Facilities" option
      this.facilityTypes = [FACILITY_TYPE_ALL];
      this.facilityTypes = this.facilityTypes.concat([...new Set(this.entities.map(entity => entity.type))].sort())
    },
    sendEmails(bvModalEvt) {
      bvModalEvt.preventDefault()
      if (this.actionedFacility) {
        this.selectedEntityIds = [this.actionedFacility.id]
      }
      if (!this.facilityTypeSelected && this.selectedEntityIds.length === 0) {
        this.showEmailErr = true;
        return
      }
      // send emails
      const payload = {};

      if (this.selectedEntityIds.length) {
        payload.entityIds = this.selectedEntityIds;
      } else {
        payload.entityType = this.facilityTypeSelected !== FACILITY_TYPE_ALL ? this.facilityTypeSelected : null;
      }

      this.$root.apiPOSTRequest("/contact/send", payload, this.handleSendEmailsResponse)
      // close modal
      this.$nextTick(() => {
        // Reset selected Entities
        this.selectAllEntities = false;
        this.selectedEntityIds = [];
        this.actionedFacility = null;

        this.showEmailErr = false;
        this.$bvModal.hide('email-facility-modal')
      })
    },
    handleSendEmailsResponse(response) {
      const title = (response && response.data.results) ? 'Success' : 'Error';
      const variant = (response && response.data.results) ? 'success' : 'danger';
      const msg = (response && response.data.results) ? `Success: Emails sent to ${response.data.results.totalContacts} contact${response.data.results.totalContacts === 1 ? '' : 's'} at ${response.data.results.totalEntities} facilit${response.data.results.totalEntities === 1 ? 'y' : 'ies'}` : 'Error: Failed to send emails';
      this.$bvToast.toast(msg, {
        title,
        variant,
        solid: true
      })
    },
    onFiltered(filteredItems) {
      this.rows = filteredItems.length
      this.currentPage = 1
    },
    filterRow(row, filter) {
      let match = !filter.status || row.status === this.filter.status
      return match && filter.keyword
          ? this.filterOn.reduce(
              (match, field) =>
                  match ||
                  row[field].toLowerCase().match(filter.keyword.toLowerCase()),
              false
          )
          : match
    },
    addFacility() {
      this.$router.push({
        name: "facility-add"
      })
    },
    selectEntityAllClick(checked) {
      if (checked) {
        this.selectedEntityIds = this.entities.map(entity => entity.id);
      } else {
        this.selectedEntityIds = [];
      }
      this.$refs.entityTable.refresh()
    },
    selectEntityClick(checkedValue) {
      this.selectAllEntities = checkedValue.length === this.entities.length
    },
    downloadCSV() {
      const path = this.filter.keyword ? `/csv/Entity?filter=${this.filter.keyword}` : '/csv/Entity';
      this.$root.apiGETRequest(path, this.createDownload)
    },
    createDownload(data) {
      const downloadUrl = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      const dateObj = new Date()
      const dateStr = `${dateObj.getUTCMonth() + 1}_${dateObj.getUTCDate()}_${dateObj.getUTCFullYear()}`
      link.setAttribute('download', `HCRC_Facilities_${dateStr}.csv`); //any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  },
  mounted() {
    let options = this.$root.getStatuses().map(status => {
      return {value: status, text: status, disabled: false}
    })
    this.statusOptions = [{value: null, text: "All"}, ...options]
    this.$root.apiGETRequest("/entity", this.updateEntities)
  },
}
</script>


<style lang="scss">
h1,
h3 {
  text-align: left;
}

table tr > th,
table tr > td {
  text-align: left !important;
}

ul.pagination {
  display: block;
  margin: auto;
  text-align: center;
}

ul.pagination > li {
  display: inline-block;
}

p.lead {
  margin: 30px 0 15px;
}

#email-facility-modal {
  p.error {
    width: 100%;
    margin-top: .25rem;
    font-size: 80%;
    color: #dc3545;
  }
}

.tableIcons a {
  margin-right: 5px;
  color: inherit !important;
}

</style>
