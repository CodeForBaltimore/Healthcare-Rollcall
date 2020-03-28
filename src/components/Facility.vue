<template>
    <b-container fluid="md" id="facility">
        <h1>{{ entity.name }}</h1>
        <b-row>
            <b-col cols="12" md="4">
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
                        {{ entity.phone[0].number | phone }}
                    </p>
                    <ol v-if="entity.phone">
                        <li v-for="number in entity.phone"
                            v-bind:key="number.number"
                            v-bind:class="{ primary: number.isPrimary }">{{ number.number | phone }}</li>
                    </ol>

                    <!-- Show Contacts if available -->
                    <h6 class="card-subtitle mb-2" v-if="entity.contacts && entity.contacts.length > 0">Contacts</h6>
                    <div v-if="entity.contacts && entity.contacts.length === 1" class="contact">
                        <p><a v-bind:href="'/user/' + entity.contacts[0].contact.id">{{ entity.contacts[0].contact.name }}</a></p>
                        <p v-if="entity.contacts[0].contact.phone.length === 1">Phone: {{ entity.contacts[0].contact.phone[0].number | phone }}</p>
                        <p v-if="entity.contacts[0].contact.email.length === 1">Email: <a v-bind:href="'mailto:' + entity.contacts[0].contact.email[0].address">{{ entity.contacts[0].contact.email[0].address}}</a></p>
                    </div>
                    <ul v-if="entity.contacts && entity.contacts.length > 1">
                        <li v-for="contact in entity.contacts"
                            v-bind:key="contact.id">
                            <a v-bind:href="`/contact/${contact.contact.EntityId}/${contact.contact.id}`">{{contact.contact.name}}</a><br />
                            Phone:
                            <ol v-if="contact.contact.phone">
                                <li v-for="number in contact.contact.phone"
                                    v-bind:key="number.number"
                                    v-bind:class="{ primary: number.isPrimary }">{{ number.number | phone }}</li>
                            </ol>
                            Email:
                            <ol v-if="contact.contact.email">
                                <li v-for="address in contact.contact.email"
                                    v-bind:key="address.address"
                                    v-bind:class="{ primary: address.isPrimary }"><a v-bind:href="'mailto:' +  address.address">{{ address.address }}</a></li>
                            </ol>
                        </li>
                    </ul>
<!--                    <b-button v-on:click="addNed()">Add Ned</b-button>-->
                </b-card>
            </b-col>
            <b-col cols="12" md="8">
                <b-row>
                    <b-col>
                        <h2>Begin New Check-In</h2>
                        <ol>
                            <li v-if="entity.phone || (entity.contacts && entity.contacts[0].contact.phone.length > 0)">Call the phone number
                                <span v-if="entity.contacts[0].contact.phone[0].number">{{ entity.contacts[0].contact.phone[0].number | phone }}</span>
                                <span v-if="entity.phone && !entity.contacts[0].contact.phone[0].number">{{ entity.phone[0].number | phone }}</span>
                            </li>
                            <li v-if="!entity.phone && !entity.contacts[0].contact.phone.length > 0">Contact the facility using the contact information to the left.</li>
                            <li>Start the check-in by asking the 5 questions under &quot;New Check-in&quot;</li>
                            <li>Once you are finished, click &quot;Submit&quot; at the bottom of the form</li>
                            <li>Start the next provider</li>
                        </ol>
                        <b-card title="Previous Check-In" class="facility-check-in">
                            <b-alert show variant="info" v-if="!lastCheckIn">
                                <h6 class="alert-heading">Nothing to show</h6>
                                <p>There are no check-ins on record for this facility.</p>
                            </b-alert>
                            <div v-if="lastCheckIn" class="last-checkin">
                                <h5>Status: <b-badge pill v-bind:variant="lastCheckInStatus.state">{{ lastCheckInStatus.status }}</b-badge></h5>
                                <h6>Comments</h6>
                                <p>{{ lastCheckIn.questionnaire.comments.value | nullToNone }}</p>
                                <h6>Questionnaire</h6>
                                <p><strong>Time of last check-in: </strong>{{ lastCheckIn.date }}</p>
                            </div>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-card title="New Check-In" class="facility-check-in">
                            <b-alert show variant="success" v-if="!showForm">
                                <h6 class="alert-heading">Check-In Complete</h6>
                                <p>The form was successfully saved for {{ entity.name }}.</p>
                            </b-alert>

                            <b-button v-if="!showForm" v-on:click="toggleForm">Submit Another</b-button>

                            <b-form @submit="addNewCheckin" @reset="resetCheckin" v-if="showForm">
                                <p>Begin a new check-in by answering the questions below.  Click "Submit" once you are done.</p>
                                <h5>Question 1</h5>
                                <b-form-group id="check-in-input-question-1" v-bind:label="newCheckIn.questionnaire.question1[0].label">
                                    <b-form-radio required v-model="newCheckIn.questionnaire.question1[0].value" name="question-1-radio" value="Yes">Yes</b-form-radio>
                                    <b-form-radio required v-model="newCheckIn.questionnaire.question1[0].value" name="question-1-radio" value="No">No</b-form-radio>
                                    <b-form-radio required v-model="newCheckIn.questionnaire.question1[0].value" name="question-1-radio" value="I don't know">I don't know</b-form-radio>
                                </b-form-group>
                                <h5>Question 2</h5>
                                <h6>Part A</h6>
                                <b-form-group id="check-in-input-question-2a" v-bind:label="newCheckIn.questionnaire.question2[0].label">
                                    <b-form-radio required v-model="newCheckIn.questionnaire.question2[0].value" name="question-2a-radio" value="Yes">Yes</b-form-radio>
                                    <b-form-radio required v-model="newCheckIn.questionnaire.question2[0].value" name="question-2a-radio" value="No">No</b-form-radio>
                                    <b-form-radio required v-model="newCheckIn.questionnaire.question2[0].value" name="question-2a-radio" value="I don't know">I don't know</b-form-radio>
                                </b-form-group>
                                <h6>Part B</h6>
                                <b-form-group id="check-in-input-question-2b" v-bind:label="newCheckIn.questionnaire.question2[1].label">
                                    <b-form-radio required v-model="newCheckIn.questionnaire.question2[1].value" name="question-2b-radio" value="Yes">Yes</b-form-radio>
                                    <b-form-radio required v-model="newCheckIn.questionnaire.question2[1].value" name="question-2b-radio" value="No">No</b-form-radio>
                                    <b-form-radio required v-model="newCheckIn.questionnaire.question2[1].value" name="question-2b-radio" value="I don't know">I don't know</b-form-radio>
                                </b-form-group>
                                <h6>Part C</h6>
                                <b-form-group id="check-in-input-question-2c" v-bind:label="newCheckIn.questionnaire.question2[2].label">
                                    <b-form-radio required v-model="newCheckIn.questionnaire.question2[2].value" name="question-2c-radio" value="Yes">Yes</b-form-radio>
                                    <b-form-radio required v-model="newCheckIn.questionnaire.question2[2].value" name="question-2c-radio" value="No">No</b-form-radio>
                                    <b-form-radio required v-model="newCheckIn.questionnaire.question2[2].value" name="question-2c-radio" value="I don't know">I don't know</b-form-radio>
                                </b-form-group>
                                <h6>Part D</h6>
                                <b-form-group id="check-in-input-question-2d" v-bind:label="newCheckIn.questionnaire.question2[3].label">
                                    <b-form-radio required v-model="newCheckIn.questionnaire.question2[3].value" name="question-2d-radio" value="Yes">Yes</b-form-radio>
                                    <b-form-radio required v-model="newCheckIn.questionnaire.question2[3].value" name="question-2d-radio" value="No">No</b-form-radio>
                                    <b-form-radio required v-model="newCheckIn.questionnaire.question2[3].value" name="question-2d-radio" value="I don't know">I don't know</b-form-radio>
                                </b-form-group>
                                <h5>Question 3</h5>
                                <b-form-group id="check-in-input-question-3" v-bind:label="newCheckIn.questionnaire.question3[0].label" label-for="question-3">
                                    <b-form-textarea
                                            id="question-3"
                                            v-model="newCheckIn.questionnaire.question3[0].value"
                                            placeholder="Response"
                                            rows="3"
                                    ></b-form-textarea>
                                </b-form-group>
                                <h5>Question 4</h5>
                                <b-form-group id="check-in-input-question-4" v-bind:label="newCheckIn.questionnaire.question4[0].label" label-for="question-4">
                                    <b-form-textarea
                                            id="question-4"
                                            v-model="newCheckIn.questionnaire.question4[0].value"
                                            placeholder="Response"
                                            rows="3"
                                    ></b-form-textarea>
                                </b-form-group>
                                <h5>Question 5</h5>
                                <b-form-group id="check-in-input-question-5" v-bind:label="newCheckIn.questionnaire.question5[0].label" label-for="question-5">
                                    <b-form-textarea
                                            id="question-5"
                                            v-model="newCheckIn.questionnaire.question5[0].value"
                                            placeholder="Response"
                                            rows="3"
                                    ></b-form-textarea>
                                </b-form-group>
                                <h5>Comments</h5>
                                <b-form-group id="check-in-input-comments" v-bind:label="newCheckIn.questionnaire.comments.label" label-for="comments">
                                    <b-form-textarea
                                            id="comments"
                                            v-model="newCheckIn.questionnaire.comments.value"
                                            placeholder="Response"
                                            rows="3"
                                    ></b-form-textarea>
                                </b-form-group>
                                <h5>Status Rating</h5>
                                <b-form-group id="check-in-input-status" label="Facility Operating Status">
                                    <b-form-radio required v-model="newCheckIn.status" name="question-status" value="Safe">Safe</b-form-radio>
                                    <b-form-radio required v-model="newCheckIn.status" name="question-status" value="Monitoring">Monitoring</b-form-radio>
                                    <b-form-radio required v-model="newCheckIn.status" name="question-status" value="Critical">Critical</b-form-radio>
                                </b-form-group>
                                <b-button type="submit" variant="primary">Submit Check-In</b-button>
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
                    name: "Loading...",
                },
                entityCheckIn: {
                    name: null
                },
                showForm: true,
                lastCheckIn: null,
                lastCheckInStatus: {
                    state: "dark",
                    status: "Unknown"
                },
                newCheckIn: {
                    status: null,
                    date: null,
                    questionnaire: {
                        question1: [
                            {
                                label: 'Have you seen the recommendations by the State called the "Recommendations for infection control & prevention of COVID-19 in facilities serving older adults"?',
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
                        ],
                        comments: {
                            label: "Any additional comments?",
                            value: null
                        }
                    }
                }
            }
        },
        methods: {
            updateFacilityData(obj) {
                console.log(JSON.stringify(obj));
                if(obj.checkIn === null) {
                    this.entity = this.duplicateData(obj);
                    this.entity.checkIn = {
                        checkIns: []
                    };
                    this.entityCheckIn = this.duplicateData(obj);
                    this.entityCheckIn.checkIn = [];
                } else {
                    this.entity = this.duplicateData(obj);
                    this.entityCheckIn = this.duplicateData(obj);
                    this.entityCheckIn.checkIn = this.duplicateData(this.entityCheckIn.checkIn.checkIns);
                    this.setLastCheckInData();
                }
                if(obj.contacts.length == 0) {
                    let emptyContact = [{
                        phone: [],
                        email: []
                    }];
                    this.entity.contacts = this.duplicateData(emptyContact);
                    this.entityCheckIn.contacts = this.duplicateData(emptyContact);
                }
                console.log(JSON.stringify(this.entity));
            },
            checkinCallback(response) {
                console.log(response);
                this.setLastCheckInData();
            },
            toggleForm(){
                this.resetCheckin();
                this.showForm = true;
            },
            resetCheckin() {
                this.newCheckIn.questionnaire.question1[0].value = null;
                this.newCheckIn.questionnaire.question2[0].value = null;
                this.newCheckIn.questionnaire.question2[1].value = null;
                this.newCheckIn.questionnaire.question2[2].value = null;
                this.newCheckIn.questionnaire.question2[3].value = null;
                this.newCheckIn.questionnaire.question3[0].value = null;
                this.newCheckIn.questionnaire.question4[0].value = null;
                this.newCheckIn.questionnaire.question5[0].value = null;
                this.newCheckIn.questionnaire.comments.value = null;
                this.newCheckIn.status = null;
            },
            addNewCheckin() {
                this.showForm = false;
                this.newCheckIn.date = new Date();
                this.entity.checkIn.checkIns.push(this.newCheckIn);
                this.entityCheckIn.checkIn = this.newCheckIn;
                this.$root.apiPUTRequest("/entity", this.entityCheckIn, this.checkinCallback);
            },
            getEntity() {
                this.$root.apiGETRequest("/entity/" + this.$route.params.entityID, this.updateFacilityData);
            },
            duplicateData(object){
                return JSON.parse(JSON.stringify(object));
            },
            setLastCheckInData() {
                this.lastCheckIn = this.entity.checkIn.checkIns[this.entity.checkIn.checkIns.length-1];
                this.lastCheckInStatus.status = this.lastCheckIn.status;

                switch(this.lastCheckInStatus.status) {
                    case "Safe":
                        this.lastCheckInStatus.state = "success";
                        break;
                    case "Monitoring":
                        this.lastCheckInStatus.state = "warning";
                        break;
                    case "Critical":
                        this.lastCheckInStatus.state = "danger";
                        break;
                }
            },
            addNed() {
                let self = this;
                let payload = {
                    id: null,
                    EntityId: null
                };
                this.$root.apiGETRequest("/contact", function(response) {
                    console.log(response.results);
                    payload.id = response.results[0].id;
                    payload.EntityId = self.$route.params.entityID;
                    self.$root.apiPUTRequest("/contact", payload, function(response) {
                        console.log(response);
                    });
                });
            }
        },
        mounted() {
            this.getEntity();
        }
    }
</script>

<style scoped>
    h1 {
        text-align: left;
        margin-bottom:30px;
    }
    .card h6 {
        font-weight: bold;
    }
    form h5 {
        border-bottom: 2px solid #42484f;
        padding-bottom: 8px;
        margin: 16px 0;
    }
    form h6, .last-checkin h6 {
        font-weight: bold;
        background-color: #f1f1f1;
        box-sizing: border-box;
        padding: 8px;
    }
    .last-checkin p {
        padding: 0 8px;
    }
    .card-body {
        text-align: left;
    }
    p.return-link {
        text-align: left;
    }
    .contact p {
        margin: 0;
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
    .custom-control-label {
        cursor: pointer;
    }
    button {
        margin-right: 15px;
    }
    button.btn-primary {
        padding-left: 30px;
        padding-right: 30px;
    }
</style>