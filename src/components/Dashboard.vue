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
                  v-model="filter.keyword"
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
          <b-col cols="4">
            <b-form-group label="Status" label-align="left" label-for="dashboard-table">
              <b-input-group>
                <b-form-select v-model="filter.status" :options="statusOptions"></b-form-select>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-table
          id="dashboard-table"
          striped
          hover
          sticky-header
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
            <span>{{ data.item.status }}</span>
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
      filter: {
        keyword: null,
        status: null
      },
      filterOn: ["name"],
      statusOptions: [],
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
        } else {
          entity.status = "No Previous Check-in";
        }
      }
    },
    onFiltered(filteredItems) {
      this.rows = filteredItems.length;
      this.currentPage = 1;
    },
    filterRow(row, filter) {
      let match = !filter.status || row.status === this.filter.status;
      return match && filter.keyword
        ? this.filterOn.reduce(
            (match, field) =>
              match ||
              row[field].toLowerCase().match(filter.keyword.toLowerCase()),
            false
          ) : match;
    }
  },
  mounted() {
    let options = this.$root.getStatuses().map(status => {
      return { value: status, text: status };
    });
    this.statusOptions = [{ value: null, text: "All" }, ...options];
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