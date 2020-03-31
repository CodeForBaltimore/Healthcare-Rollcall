<template>
  <b-container fluid="md" id="dashboard">
    <b-row>
      <b-col cols="12">
        <h1>Provider Status Dashboard</h1>
        <h4 class="text-muted">Status &amp; Check-in Starting Point</h4>
        <p
          class="lead"
        >Choose a Provider from the list below to begin Check-in. You can edit all provider info once inside their page.</p>
        <!-- Dashboard Table -->
        <b-row>
          <b-col cols="4">
            <b-form-group label="Filter" label-align="left" label-for="dashboard-table">
              <b-input-group>
                <b-form-input
                  v-model="filter"
                  type="search"
                  id="dashboard-table"
                  placeholder="Type to Search"
                ></b-form-input>
                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''" variant="outline-primary">Clear</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-table
          id="dashboard-table"
          striped
          hover
          sticky-header
          :filter="filter"
          :filterIncludedFields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
          :items="entities"
          :fields="[
            {
              key: 'name', stickyColumn: true, isRowHeader: true,
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
              // Variant applies to the whole column, including the header and footer
              //variant: 'danger'
            }
          ]"
        >
          <template v-slot:cell(name)="data">
            <router-link
              :to="{ name: 'facility', params: { entityID: data.item.id }}"
            >{{ data.item.name }}</router-link>
          </template>
          <template v-slot:cell(status)="data">
            <span>{{ data.item.status ? data.item.status : 'No Previous Check-in' }}</span>
          </template>
        </b-table>
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" class="mt-4"></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      rows: 0,
      perPage: 10,
      currentPage: 1,
      filter: null,
      filterOn: ['name', 'status'],
      entities: null,
      sortBy: "updated",
      sortDesc: false,
      sortDirection: "asc",
      fields: [
        { key: "name", sortable: true },
        { key: "status", sortable: true },
        { key: "updatedAt", sortable: true }
      ]
    };
  },
  methods: {
    updateEntities(obj) {
      this.entities = obj.results;
      this.rows = this.entities.length;
      for (let entity of this.entities) {
        if (
          entity.checkIn &&
          entity.checkIn.checkIns &&
          entity.checkIn.checkIns.length > 0
        ) {
          entity.status =
            entity.checkIn.checkIns[entity.checkIn.checkIns.length - 1].status;
        }
      }
    },
    onFiltered(filteredItems) {
      console.log(this);
      this.rows = filteredItems.length;
      this.currentPage = 1;
    }
  },
  mounted() {
    this.$root.apiGETRequest("/entity", this.updateEntities);
  }
};
</script>

<style>
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
</style>