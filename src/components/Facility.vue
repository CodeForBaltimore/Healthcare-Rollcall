<template>
    <b-container fluid="md" id="facility">
        <h1>{{ entity.name }}</h1>
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
                    <h6 class="card-subtitle mb-2" v-if="entity.contacts.length > 0">Contacts</h6>
                    <ul v-if="entity.contacts.length > 0">
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
                            <b-alert show variant="info" v-if="entity.checkIn == null">
                                <h6 class="alert-heading">Nothing to show</h6>
                                <p>There are no check-ins on record for this facility.</p>
                            </b-alert>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-card title="New Check-In" class="facility-check-in">
                            <p>Begin a new check-in by answering the questions below.  Click "Submit" once you are done.</p>
                            <b-form @submit="addNewCheckin" @reset="resetCheckin" v-if="showForm">
                                <h5>Question 1</h5>
                                <b-form-group id="check-in-input-question-1" v-bind:label="newCheckIn.question1[0].label">
                                    <b-form-radio v-model="newCheckIn.question1[0].value" name="question-1-radio" value="Yes">Yes</b-form-radio>
                                    <b-form-radio v-model="newCheckIn.question1[0].value" name="question-1-radio" value="No">No</b-form-radio>
                                </b-form-group>
                                <h5>Question 2</h5>
                                <h6>Part A</h6>
                                <b-form-group id="check-in-input-question-2a" v-bind:label="newCheckIn.question2[0].label">
                                    <b-form-radio v-model="newCheckIn.question2[0].value" name="question-2a-radio" value="Yes">Yes</b-form-radio>
                                    <b-form-radio v-model="newCheckIn.question2[0].value" name="question-2a-radio" value="No">No</b-form-radio>
                                </b-form-group>
                                <h6>Part B</h6>
                                <b-form-group id="check-in-input-question-2b" v-bind:label="newCheckIn.question2[1].label">
                                    <b-form-radio v-model="newCheckIn.question2[1].value" name="question-2b-radio" value="Yes">Yes</b-form-radio>
                                    <b-form-radio v-model="newCheckIn.question2[1].value" name="question-2b-radio" value="No">No</b-form-radio>
                                </b-form-group>
                                <h6>Part C</h6>
                                <b-form-group id="check-in-input-question-2c" v-bind:label="newCheckIn.question2[2].label">
                                    <b-form-radio v-model="newCheckIn.question2[2].value" name="question-2c-radio" value="Yes">Yes</b-form-radio>
                                    <b-form-radio v-model="newCheckIn.question2[2].value" name="question-2c-radio" value="No">No</b-form-radio>
                                </b-form-group>
                                <h6>Part D</h6>
                                <b-form-group id="check-in-input-question-2d" v-bind:label="newCheckIn.question2[3].label">
                                    <b-form-radio v-model="newCheckIn.question2[3].value" name="question-2d-radio" value="Yes">Yes</b-form-radio>
                                    <b-form-radio v-model="newCheckIn.question2[3].value" name="question-2d-radio" value="No">No</b-form-radio>
                                </b-form-group>
                                <h5>Question 3</h5>
                                <b-form-group id="check-in-input-question-3" v-bind:label="newCheckIn.question3[0].label" label-for="question-3">
                                    <b-form-input
                                            id="question-3"
                                            v-model="newCheckIn.question3[0].value"
                                            placeholder="Response"
                                    ></b-form-input>
                                </b-form-group>
                                <h5>Question 4</h5>
                                <b-form-group id="check-in-input-question-4" v-bind:label="newCheckIn.question4[0].label" label-for="question-4">
                                    <b-form-input
                                            id="question-4"
                                            v-model="newCheckIn.question4[0].value"
                                            placeholder="Response"
                                    ></b-form-input>
                                </b-form-group>
                                <h5>Question 5</h5>
                                <b-form-group id="check-in-input-question-5" v-bind:label="newCheckIn.question5[0].label" label-for="question-5">
                                    <b-form-textarea
                                            id="question-5"
                                            v-model="newCheckIn.question5[0].value"
                                            placeholder="Response"
                                    ></b-form-textarea>
                                </b-form-group>
                                <b-button type="submit" variant="primary">Submit</b-button>
                                <b-button type="reset" variant="outline-secondary">Reset</b-button>
                            </b-form>
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
                },
                showForm: true,
                newCheckIn: {
                    question1: [
                        {
                            label: "Have you seen the recommendations by the State called the &quot;Recommendations for infection control &amp; prevention of COVID-19 in facilities serving older adults&quot;?",
                            value: null
                        }
                    ],
                    question2: [
                        {
                            label: "Is your location limiting visitors?",
                            value: null
                        },
                        {
                            label: "Are they actively screening and monitoring for those who are sick for both those who are patients and employees? (looking for signs/symptoms of cough fever, shortness of breath or taking temperatures)",
                            value: null
                        },
                        {
                            label: "Has your location stopped having congregate meals?",
                            value: null
                        },
                        {
                            label: "Has your location posted signs for handwashing?",
                            value: null
                        }
                    ],
                    question3: [
                        {
                            label: "How is your facility handling leave of absences from nursing homes (i.e. doctor's visits, dialysis, and outside medical visits)?",
                            value: null
                        }
                    ],
                    question4: [
                        {
                            label: "We would like to send you more materials. What is the best way? (Fax number or email)",
                            value: null
                        }
                    ],
                    question5: [
                        {
                            label: "Note any issues or needs (i.e. PPE)",
                            value: null
                        }
                    ]
                }
            }
        },
        methods: {
            updateFacilityData(obj) {
                this.entity = obj;
            },
            checkinCallback(response) {
                console.log(response);
            },
            resetCheckin() {
                this.newCheckIn.question1[0].value = null;
                this.newCheckIn.question2[0].value = null;
                this.newCheckIn.question2[1].value = null;
                this.newCheckIn.question2[2].value = null;
                this.newCheckIn.question2[3].value = null;
                this.newCheckIn.question3[0].value = null;
                this.newCheckIn.question4[0].value = null;
                this.newCheckIn.question5[0].value = null;
            },
            addNewCheckin() {
                this.showForm = false;
                this.$root.apiPUTRequest("/entity", this.newCheckIn, this.checkinCallback());
            }
        },
        mounted() {
            this.$root.apiGETRequest("/entity/" + this.$route.params.entityID, this.updateFacilityData);
        }
    }
</script>

<style scoped>
    h1 {
        text-align: left;
    }
    form h5 {
        border-bottom: 2px solid #42484f;
        padding-bottom: 8px;
        margin: 16px 0;
    }
    form h6 {
        font-weight: bold;
        background-color: #f1f1f1;
        box-sizing: border-box;
        padding:8px;
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
    .alert {
        margin-bottom: 0;
    }
    .alert h6 {
        font-weight: bold;
        margin-top: 4px;
    }
    p:last-child {
        margin-bottom: 0;
    }
</style>