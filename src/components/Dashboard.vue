            <template>
  <b-container fluid="md" id="dashboard">
    <h1>Dashboard Test</h1>
    <b-row>
      <b-col>
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
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="dashboard-table"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

       <b-table
                id="dashboard-table"
                striped
                hover
                :filter="filter"
                :filterIncludedFields="filterOn"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                @filtered="onFiltered"
                stickyheader:true
                :items="entities"
                :fields="[
{
            key: 'name', stickyColumn: true, isRowHeader: true,   
            sortable: true
          },
          {
            key: 'lastCheckin',
            sortable: true
          },
          {
            key: 'updatedAt',
            label: 'Updated',
            sortable: true,
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
          <template v-slot:cell(lastCheckIn)="data">
            <span v-if="data.item.checkIn">{{ data.item.checkIn.checkIns[data.item.checkIn.checkIns.length-1].status }}</span>
          </template>
        </b-table>
       <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="⏮"
      prev-text="⏪"
      next-text="⏩"
      last-text="⏭"
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
      rows: 20,
        perPage: 10,
        currentPage: 1,
      filter: null,
        filterOn: [],
        entities: null,
        table: {
          rows: 0,
          currentPage: 1
        }
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