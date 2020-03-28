<template>
  <b-container fluid="md" id="dashboard">
    <b-row>
      <b-col cols="12">
        <h1>Provider Status Dashboard</h1>
        <h4 class="text-muted">Status &amp; Check-in Starting Point</h4>
        <p class="lead">Choose a Provider from the list below to begin Check-in. You can edit all provider info once inside their page.</p>
        <!-- Dashboard Table -->
       <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="dashboard-table"
          class="mb-0"
        >
          <template v-slot:cell(name)="data">
            <router-link
                    :to="{ name: 'facility', params: { entityID: data.item.id }}"
            >{{ data.item.name }}</router-link>
          </template>
          <template v-slot:cell(status)="data">
            <span v-if="data.item.checkIn.checkIns.length > 0">{{ data.item.checkIn.checkIns[data.item.checkIn.checkIns.length-1].status }}</span>
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          class="mt-4"
        ></b-pagination>
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
        filterOn: [],
        entities: null,
        sortBy: 'updated',
        sortDesc: false,
        sortDirection: 'asc',
        fields: [
            { key: 'name', sortable: true },
            { key: 'status', sortable: true },
            { key: 'updatedAt', sortable: true }
        ]
      };
    },
    methods: {
      updateEntities(obj) {
        this.entities = obj.results;
        this.rows = this.entities.length;
      },
      onFiltered(filteredItems) {
        this.rows = filteredItems.length;
        this.currentPage = 1
      }
    },
    mounted() {
      this.$root.apiGETRequest("/entity", this.updateEntities);
    }
  }
</script>

<style>
  h1, h3 {
    text-align: left;
  }
  table tr > th, table tr > td {
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