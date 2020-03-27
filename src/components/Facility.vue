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
                    <h6 class="card-subtitle mb-2" v-if="data.email">Email Addresses</h6>
                    <p v-if="data.email" v-bind:class="{ primary: data.email[0].isPrimary }">
                        <a v-bind:href="'mailto:' +  data.email[0].address">{{ data.email[0].address }}</a>
                    </p>
                    <ol v-if="data.email">
                        <li v-for="address in data.email"
                            v-bind:key="address.address"
                            v-bind:class="{ primary: address.isPrimary }"><a v-bind:href="'mailto:' +  address.address">{{ address.address }}</a></li>
                    </ol>

                    <!-- Show Phone Numbers if available -->
                    <h6 class="card-subtitle mb-2" v-if="data.phone">Phone Numbers</h6>
                    <p v-if="data.phone" v-bind:class="{ primary: data.phone[0].isPrimary }">
                        {{ data.phone[0].number }}
                    </p>
                    <ol v-if="data.phone">
                        <li v-for="number in data.phone"
                            v-bind:key="number.number"
                            v-bind:class="{ primary: number.isPrimary }">{{ number.number }}</li>
                    </ol>

                    <!-- Show Contacts if available -->
                    <h6 class="card-subtitle mb-2" v-if="data.contacts">Contacts</h6>
                    <ul v-if="data.contacts">
                        <li v-for="contact in data.contacts"
                            v-bind:key="contact.id">
                            <a v-bind:href="`/user/${contact.contact.id}`">{{contact.contact.name}}</a><br />
                            Phone:
                            <ol v-if="contact.contact.phone">
                                <li v-for="number in contact.contact.phone"
                                    v-bind:key="number.number"
                                    v-bind:class="{ primary: number.isPrimary }"><a v-bind:href="`tel:${number.number}`">{{ number.number }}</a></li>
                            </ol>
                            Email:
                            <ol v-if="contact.contact.email">
                                <li v-for="address in contact.contact.email"
                                    v-bind:key="address.address"
                                    v-bind:class="{ primary: address.isPrimary }"><a v-bind:href="'mailto:' +  address.address">{{ address.address }}</a></li>
                            </ol>
                        </li>
                    </ul>

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
    export default {
        name: "Facility",
        data() {
            return {
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
            this.updateFacilityData(this.$root.apiRequest("/entity/" + this.$route.params.entityID));
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