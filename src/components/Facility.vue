<template>
    <b-container fluid="md" id="facility">
        <h1>{{ entity.name }}</h1>
        <p class="return-link">
            <router-link :to="{ name: 'dashboard'}">&larr; Back to Dashboard</router-link>
        </p>
        <b-row>
            <b-col cols="4">
                <b-card title="Contact Information">
                    <!-- Show Address if available -->
                    <h6 class="card-subtitle mb-2" v-if="entity.address">Address</h6>
                    <p v-if="entity.address">
                        <span v-for="line in entity.address.street" v-bind:key="line" class="address-line">{{ line }}</span>
                        <span v-if="entity.address.city && entity.address.state && entity.address.zip" class="address-line">
                            {{ entity.address.city }}, {{ entity.address.state }} {{ entity.address.zip }}
                        </span>
                    </p>

                    <!-- Show Email Address if available -->
                    <h6 class="card-subtitle mb-2" v-if="entity.email">Email Addresses</h6>
                    <p v-if="entity.email" v-bind:class="{ primary: entity.email[0].isPrimary }">
                        <a v-bind:href="'mailto:' +  entity.email[0].address">{{ entity.email[0].address }}</a>
                    </p>
                    <ol v-if="entity.email">
                        <li v-for="address in entity.email"
                            v-bind:key="address.address"
                            v-bind:class="{ primary: address.isPrimary }"><a v-bind:href="'mailto:' +  address.address">{{ address.address }}</a></li>
                    </ol>

                    <!-- Show Phone Numbers if available -->
                    <h6 class="card-subtitle mb-2" v-if="entity.phone">Phone Numbers</h6>
                    <p v-if="entity.phone" v-bind:class="{ primary: entity.phone[0].isPrimary }">
                        {{ entity.phone[0].number }}
                    </p>
                    <ol v-if="entity.phone">
                        <li v-for="number in entity.phone"
                            v-bind:key="number.number"
                            v-bind:class="{ primary: number.isPrimary }">{{ number.number }}</li>
                    </ol>

                    <!-- Show Contacts if available -->
                    <h6 class="card-subtitle mb-2" v-if="entity.contacts">Contacts</h6>
                    <ul v-if="entity.contacts">
                        <li v-for="contact in entity.contacts"
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
                entity: {
                    name: "Loading..."
                }
            }
        },
        methods: {
            updateFacilityData(obj) {
                this.entity = obj;
            }
        },
        mounted() {
            this.$root.apiRequest("/entity/" + this.$route.params.entityID, this.updateFacilityData);
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