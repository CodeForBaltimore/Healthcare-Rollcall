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
          <b-col cols="4">
            <b-form-group label="Status" label-align="left" label-for="dashboard-table">
              <b-input-group>
                <b-form-select v-model="filter.status" :options="statusOptions"></b-form-select>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="4" class="align--right mt-3 btn--container">
            <b-button v-if="showAdmin" v-on:click="addFacility()">Create Facility</b-button>
            <b-button v-if="showAdmin || showUser"  v-bind:class="{ full: !showAdmin }" class="ml-2" v-b-modal.email-modal>Email Facilities</b-button>
          </b-col>
          <div>
            <b-modal id="email-modal" title="Send Emails to Facilities" ok-title="Send" @ok="sendEmails">
              <b-form-group label="Select a facility type to send bulk emails" label-align="left">
                <b-form-radio required v-for="(type, i) in facilityTypes" :key="i" v-model="facilityTypeSelected"
                              v-bind:value="type">{{ type }}
                </b-form-radio>
                <p class="error" v-if="showEmailErr">Type is required</p>
              </b-form-group>
            </b-modal>
          </div>
        </b-row>
        <b-table
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
              key: 'name', stickyColumn: true, isRowHeader: true,
              sortable: true
            },
            {
              key: 'type', stickyColumn: true, isRowHeader: true,
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
            }
          ]"
        >
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
        </b-table>
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" class="mt-4"></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {FACILITY_TYPES} from '../constants/facilities.const';

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
      filterOn: ["name"],
      statusOptions: [],
      showAdmin,
      showUser,
      facilityTypes: FACILITY_TYPES,
      facilityTypeSelected: null,
      showEmailErr: false,
      entities: null,
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
    },
    sendEmails(bvModalEvt) {
      bvModalEvt.preventDefault()
      if (!this.facilityTypeSelected) {
        this.showEmailErr = true;
        return
      }
      // send emails
      const payload = {
        "relationshipTitle": [this.facilityTypeSelected]
      };
      this.$root.apiPOSTRequest("/contact/send", payload, this.handleSendResponse)
      // close modal
      this.$nextTick(() => {
        this.showEmailErr = false;
        this.$bvModal.hide('email-modal')
      })
    },
    handleSendResponse(response) {
      const title = response.data.results ? 'Success' : 'Error';
      const variant = response.data.results ? 'success' : 'danger';
      const msg = response.data.results ? `Success: Emails sent to ${response.data.results.total} facilities` : 'Error: Failed to send emails';
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
    }
  },
  mounted() {
    let options = this.$root.getStatuses().map(status => {
      return {value: status, text: status, disabled: false}
    })
    this.statusOptions = [{value: null, text: "All"}, ...options]
    this.$root.apiGETRequest("/entity", this.updateEntities)
  }
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

.btn--container {
  button {
    width: 50%;
    &.full {
      width: 100%;
    }
    @media screen and (max-width: 1000px) {
      line-height: 100%;
      font-size: 1rem;
    }
    @media screen and (max-width: 768px) {
      line-height: 100%;
      font-size: 0.7rem;
    }
  }
}

#email-modal {
  p.error {
    width: 100%;
    margin-top: .25rem;
    font-size: 80%;
    color: #dc3545;
  }
}

</style>
