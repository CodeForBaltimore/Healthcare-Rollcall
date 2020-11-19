<template>
  <b-container fluid="md" id="contact-list">
    <b-row>
      <b-col cols="12">
        <h1>Contacts Management</h1>
        <h4 class="text-muted">Create, delete, link, and unlink contacts</h4>
        <p
            class="lead"
        >Select a contact below for more information.</p>

        <b-row>
          <b-col cols="6">
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
          <b-col cols="6" class="align--right mt-3 btn--container">
            <b-button v-if="showAdmin" v-on:click="downloadCSV()">Download CSV</b-button>
          </b-col>
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
            :items="contacts"
            :filter="filter"
            :filter-function="filterRow"
            :fields="[
            {
              key: 'name', stickyColumn: true, isRowHeader: true,
              sortable: true
            },
            {
              key: 'phone[0].number', label: 'Phone', stickyColumn: true, isRowHeader: true,
            },
            {
              key: 'email[0].address', label: 'Email',
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
            },
            {
              key: 'actions',
              label: 'Actions',
              sortable: false
            }
          ]"
        >
          <template v-slot:cell(name)="data">
            <router-link
                :to="{ name: 'get-single-contact', params: { contactID: data.item.id }}"
            >{{ data.item.name }}
            </router-link>
          </template>
          <template v-slot:cell(actions)="data">
            <span v-if="data.item.email && showAdmin" class="clickable" @click="actionedContact = data.item"
                  v-b-modal.single-email-modal>
              <b-icon-envelope-fill></b-icon-envelope-fill>
            </span>
          </template>
        </b-table>
        <b-modal id="single-email-modal" title="Send Email to Contact" ok-title="Send" @ok="sendEmail">
          <p>Are you sure you want to send an email to {{ actionedContact ? actionedContact.name : 'this contact' }}?</p>
        </b-modal>
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" class="mt-4"></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

export default {
  name: "ContactList",
  data() {
    return {
      rows: 0,
      perPage: 25,
      currentPage: 1,
      filter: {
        keyword: null,
        status: null
      },
      actionedContact: null,
      showAdmin: this.$jwt.decode(this.$root.auth_token).type === "admin",
      filterOn: ["name"],
      sortBy: "updated",
      sortDesc: false,
      sortDirection: "asc",
      fields: [
        {key: "name", sortable: true},
        {key: "status", sortable: true},
        {key: "updatedAt", sortable: true}
      ],
      contacts: []
    }
  },
  methods: {
    getContacts() {
      this.$root.apiGETRequest("/contact/", this.handleContactsResponse);
    },
    handleContactsResponse(response) {
      this.contacts = response.results;
    },
    onFiltered(filteredItems) {
      this.rows = filteredItems.length;
      this.currentPage = 1;
    },
    sendEmail() {
      // send emails
      this.$root.apiPOSTRequest(`/contact/send/contact/${this.actionedContact.id}`, {}, this.handleSendResponse)
      // close modal
      this.$nextTick(() => {
        this.showEmailErr = false;
        this.$bvModal.hide('bulk-email-modal')
      })
    },
    handleSendResponse(response) {
      const title = response.data.results ? 'Success' : 'Error';
      const variant = response.data.results ? 'success' : 'danger';
      const msg = response.data.results ? `Success: ${response.data.results.message}` : 'Error: Failed to send email';
      this.$bvToast.toast(msg, {
        title,
        variant,
        solid: true
      })
    },
    downloadCSV() {
      const path = this.filter.keyword ? `/csv/Contact?filter=${this.filter.keyword}` : '/csv/Contact';
      this.$root.apiGETRequest(path, this.createDownload)
    },
    createDownload(data) {
      const downloadUrl = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      const dateObj = new Date()
      const dateStr = `${dateObj.getUTCMonth() + 1}_${dateObj.getUTCDate()}_${dateObj.getUTCFullYear()}`
      link.setAttribute('download', `HCRC_Contacts_${dateStr}.csv`); //any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    filterRow(row, filter) {
      let match = !filter.status || row.status === this.filter.status;
      return match && filter.keyword
          ? this.filterOn.reduce(
              (match, field) =>
                  match ||
                  row[field].toLowerCase().match(filter.keyword.toLowerCase()),
              false
          )
          : match;
    }
  },
  mounted() {
    this.getContacts();
  }
}
</script>
