<template>
  <b-container fluid="md" id="dashboard">
    <h1>Dashboard</h1>
    <b-row>
      <b-col>
        <!-- Dashboard Table -->
        <b-table
                id="dashboard-table"
                striped
                hover
                :items="entities"
                :fields="fields"
        >
          <template v-slot:cell(name)="data">
            <router-link
                    :to="{ name: 'facility', params: { entityID: data.item.id }}"
            >{{ data.item.name }}</router-link>
          </template>
          <template v-slot:cell(lastCheckIn)="data">
            <span v-if="data.item.checkIn">{{ data.item.checkIn.checkIns[data.item.checkIn.checkIns.length-1].status }}</span>
          </template>
        </b-table>
        <b-pagination
                v-model="table.currentPage"
                :total-rows="table.rows"
                :per-page="10"
                aria-controls="dashboard-table"
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
        entities: null,
        table: {
          rows: 0,
          currentPage: 1
        },
        fields: [
            { key: 'name', sortable: true },
            { key: 'lastCheckIn', sortable: true },
            { key: 'updatedAt', sortable: true }
        ]
      };
    },
    methods: {
      updateEntities(obj) {
        this.entities = obj.results;
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
</style>