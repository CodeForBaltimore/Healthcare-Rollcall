<template>
    <b-container fluid="md" id="facility">
        <h1>{{ data.name }}</h1>
        <p class="return-link">
            <router-link :to="{ name: 'dashboard'}">&larr; Back to Dashboard</router-link>
        </p>
        <b-row>
            <b-col cols="4">
                <b-card title="Contact Information">
                    <!-- Show Address if available -->
                    <h6 class="card-subtitle mb-2" v-if="data.address">Address</h6>
                    <p v-if="data.address">
                        <span v-for="line in data.address.street" v-bind:key="line" class="address-line">{{ line }}</span>
                        <span v-if="data.address.city && data.address.state && data.address.zip" class="address-line">
                            {{ data.address.city }}, {{ data.address.state }} {{ data.address.zip }}
                        </span>
                    </p>

                    <!-- Show Email Address if available -->
                    <h6 class="card-subtitle mb-2" v-if="data.email.length > 0">Email Addresses</h6>
                    <p v-if="data.email.length == 1" v-bind:class="{ primary: data.email[0].isPrimary }">
                        <a v-bind:href="'mailto:' +  data.email[0].address">{{ data.email[0].address }}</a>
                    </p>
                    <ol v-if="data.email.length > 1">
                        <li v-for="address in data.email"
                            v-bind:key="address.address"
                            v-bind:class="{ primary: address.isPrimary }"><a v-bind:href="'mailto:' +  address.address">{{ address.address }}</a></li>
                    </ol>

                    <!-- Show Phone Numbers if available -->
                    <h6 class="card-subtitle mb-2" v-if="data.phone.length > 0">Phone Numbers</h6>
                    <p v-if="data.phone.length == 1" v-bind:class="{ primary: data.phone[0].isPrimary }">
                        {{ data.phone[0].number }}
                    </p>
                    <ol v-if="data.phone.length > 1">
                        <li v-for="number in data.phone"
                            v-bind:key="number.number"
                            v-bind:class="{ primary: number.isPrimary }">{{ number.number }}</li>
                    </ol>

                    <!-- Show Contacts if available -->
                    <h6 class="card-subtitle mb-2" v-if="data.contacts.length > 0">Contacts</h6>
                </b-card>
            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col>
                        <b-card title="Previous Check-In" class="facility-check-in">
                            TODO
                        </b-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-card title="New Check-In" class="facility-check-in">
                            TODO
                        </b-card>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Facility",
        data() {
            return {
                api: this.$root.$data.apiEndpoint,
                data: {
                    name: ""
                }
            }
        },
        methods: {
            updateFacilityData(obj) {
                this.data = obj;
            }
        },
        created() {
            let self = this;
            axios
                .get(self.api + '/entity/' + self.$route.params.entityID)
                .then(function(response) {
                    self.updateFacilityData(response.data);
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    }
</script>

<style scoped>
    h1 {
        text-align: left;
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
</style>