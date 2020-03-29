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
                    <h6 class="card-subtitle mb-2" v-if="entity.contacts.length > 0">Contacts</h6>
                    <div v-if="entity.contacts.length === 1" class="contact">
                        <p><a v-bind:href="'/user/' + entity.contacts[0].contact.id">{{ entity.contacts[0].contact.name }}</a></p>
                        <p v-if="entity.contacts[0].contact.phone.length === 1">Phone: {{ entity.contacts[0].contact.phone[0].number | phone }}</p>
                        <p v-if="entity.contacts[0].contact.email.length === 1">Email: <a v-bind:href="'mailto:' + entity.contacts[0].contact.email[0].address">{{ entity.contacts[0].contact.email[0].address}}</a></p>
                    </div>
                    <ul v-if="entity.contacts && entity.contacts.length > 1">
                        <li v-for="contact in entity.contacts"
                            v-bind:key="contact.contact.id">
                            <br />
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
                </b-card>
            </b-col>
            <b-col cols="12" md="8">
                <b-row>
                    <b-col>
                        <h2>Begin New Check-In</h2>
                        <ol>
                            <li v-if="entity.phone || entity.contacts[0].contact.phone.length > 0">Call the phone number
                                <span v-if="entity.contacts[0].contact.phone[0].number">{{ entity.contacts[0].contact.phone[0].number | phone }}</span>
                                <span v-if="entity.phone && !entity.contacts[0].contact.phone[0].number">{{ entity.phone[0].number | phone }}</span>
                            </li>
                            <li v-if="!entity.phone && !entity.contacts[0].contact.phone.length > 0">Contact the facility using the contact information to the left.</li>
                            <li>Start the check-in by asking the 5 questions under &quot;New Check-in&quot;</li>
                            <li>Once you are finished, click &quot;Submit Check-In&quot; at the bottom of the form</li>
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
                                <p>{{ lastCheckIn.comments.value | nullToNone }}</p>
                                <h6>Questionnaire</h6>
                                <p><strong>Time of last check-in: </strong>{{ lastCheckIn.date | timestamp }}</p>
                                <b-button v-b-modal.checkin-detail-modal>Review previous checkin</b-button>
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
                                <p>Begin a new check-in by answering the questions below.  Click "Submit Check-In" once you are done.</p>
                                <strong>Please don't include any sensitive or personally identifiable information!</strong>
                                <h5>Question 1</h5>
                                <b-form-group id="check-in-input-question-1" v-bind:label="newCheckIn.questionnaire.questions[0].parts[0].label">
                                    <b-form-radio v-model="newCheckIn.questionnaire.questions[0].parts[0].value[0]" name="question-1-radio" value="Yes">Yes</b-form-radio>
                                    <b-form-radio v-model="newCheckIn.questionnaire.questions[0].parts[0].value[0]" name="question-1-radio" value="No">No</b-form-radio>
                                    <b-form-radio v-model="newCheckIn.questionnaire.questions[0].parts[0].value[0]" name="question-1-radio" value="I don't know">I don't know</b-form-radio>
                                </b-form-group>
                                <h5>Question 2</h5>
                                <h6>Part A</h6>
                                <b-form-group id="check-in-input-question-2a" v-bind:label="newCheckIn.questionnaire.questions[1].parts[0].label">
                                    <b-form-radio v-model="newCheckIn.questionnaire.questions[1].parts[0].value[0]" name="question-2a-radio" value="Yes">Yes</b-form-radio>
                                    <b-form-radio v-model="newCheckIn.questionnaire.questions[1].parts[0].value[0]" name="question-2a-radio" value="No">No</b-form-radio>
                                    <b-form-radio v-model="newCheckIn.questionnaire.questions[1].parts[0].value[0]" name="question-2a-radio" value="I don't know">I don't know</b-form-radio>
                                </b-form-group>
                                <h6>Part B</h6>
                                <b-form-group id="check-in-input-question-2b" v-bind:label="newCheckIn.questionnaire.questions[1].parts[1].label">
                                    <b-form-input
                                        id="question-2b"
                                        type="number"
                                        v-model="newCheckIn.questionnaire.questions[1].parts[1].value[0]"
                                        placeholder="0"
                                    ></b-form-input>
                                </b-form-group>
                                <h6>Part C</h6>
                                <b-form-group id="check-in-input-question-2c" v-bind:label="newCheckIn.questionnaire.questions[1].parts[2].label">
                                    <b-form-radio v-model="newCheckIn.questionnaire.questions[1].parts[2].value[0]" name="question-2b-radio" value="Yes">Yes</b-form-radio>
                                    <b-form-radio v-model="newCheckIn.questionnaire.questions[1].parts[2].value[0]" name="question-2b-radio" value="No">No</b-form-radio>
                                    <b-form-radio v-model="newCheckIn.questionnaire.questions[1].parts[2].value[0]" name="question-2b-radio" value="I don't know">I don't know</b-form-radio>
                                </b-form-group>
                                <h6>Part D</h6>
                                <b-form-group id="check-in-input-question-2d" v-bind:label="newCheckIn.questionnaire.questions[1].parts[3].label">
                                    <b-form-radio v-model="newCheckIn.questionnaire.questions[1].parts[3].value[0]" name="question-2c-radio" value="Yes">Yes</b-form-radio>
                                    <b-form-radio v-model="newCheckIn.questionnaire.questions[1].parts[3].value[0]" name="question-2c-radio" value="No">No</b-form-radio>
                                    <b-form-radio v-model="newCheckIn.questionnaire.questions[1].parts[3].value[0]" name="question-2c-radio" value="I don't know">I don't know</b-form-radio>
                                </b-form-group>
                                <h6>Part E</h6>
                                <b-form-group id="check-in-input-question-2e" v-bind:label="newCheckIn.questionnaire.questions[1].parts[4].label">
                                    <b-form-radio v-model="newCheckIn.questionnaire.questions[1].parts[4].value[0]" name="question-2d-radio" value="Yes">Yes</b-form-radio>
                                    <b-form-radio v-model="newCheckIn.questionnaire.questions[1].parts[4].value[0]" name="question-2d-radio" value="No">No</b-form-radio>
                                    <b-form-radio v-model="newCheckIn.questionnaire.questions[1].parts[4].value[0]" name="question-2d-radio" value="I don't know">I don't know</b-form-radio>
                                </b-form-group>
                                <h5>Question 3</h5>
                                <b-form-group id="check-in-input-question-3" v-bind:label="newCheckIn.questionnaire.questions[2].parts[0].label" label-for="question-3">
                                    <p class="pi-alert" v-if="elementFocus === 'question3'">
                                        <img alt="Alert Icon" src="../assets/exclamation-triangle-solid.svg"/> <strong>Remember: </strong> Do not include any personal information
                                    </p>
                                    <b-form-textarea
                                            id="question-3"
                                            v-model="newCheckIn.questionnaire.questions[2].parts[0].value[0]"
                                            placeholder="Response"
                                            @focus="elementFocus = 'question3'"
                                            @blur="elementFocus = 'null'"
                                            rows="3"
                                    ></b-form-textarea>
                                </b-form-group>
                                <h5>Question 4</h5>
                                <b-form-group id="check-in-input-question-4" v-bind:label="newCheckIn.questionnaire.questions[3].parts[0].label" label-for="question-4">
                                    <p class="pi-alert" v-if="elementFocus === 'question4'">
                                        <img alt="Alert Icon" src="../assets/exclamation-triangle-solid.svg"/> <strong>Remember: </strong> Do not include any personal information
                                    </p>
                                    <b-form-textarea
                                            id="question-4"
                                            v-model="newCheckIn.questionnaire.questions[3].parts[0].value[0]"
                                            placeholder="Response"
                                            @focus="elementFocus = 'question4'"
                                            @blur="elementFocus = 'null'"
                                            rows="3"
                                    ></b-form-textarea>
                                </b-form-group>
                                <h5>Question 5</h5>
                                <h6>Part A</h6>
                                <b-form-group id="check-in-input-question-5a" v-bind:label="newCheckIn.questionnaire.questions[4].parts[0].label">
                                    <b-form-checkbox v-model="newCheckIn.questionnaire.questions[4].parts[0].value[0]" name="question-5a-option-1" value="Gloves">Gloves</b-form-checkbox>
                                    <b-form-checkbox v-model="newCheckIn.questionnaire.questions[4].parts[0].value[1]" name="question-5a-option-2" value="Masks">Masks</b-form-checkbox>
                                    <b-form-checkbox v-model="newCheckIn.questionnaire.questions[4].parts[0].value[2]" name="question-5a-option-3" value="Sanitizer">Sanitizer</b-form-checkbox>
                                </b-form-group>
                                <h6>Part B</h6>
                                <b-form-group id="check-in-input-question-5b" v-bind:label="newCheckIn.questionnaire.questions[4].parts[1].label" label-for="question-5">
                                    <p class="pi-alert" v-if="elementFocus === 'question5'">
                                        <img alt="Alert Icon" src="../assets/exclamation-triangle-solid.svg"/> <strong>Remember: </strong> Do not include any personal information
                                    </p>
                                    <b-form-textarea
                                            id="question-5"
                                            v-model="newCheckIn.questionnaire.questions[4].parts[1].value[0]"
                                            placeholder="Response"
                                            @focus="elementFocus = 'question5'"
                                            @blur="elementFocus = 'null'"
                                            rows="3"
                                    ></b-form-textarea>
                                </b-form-group>
                                <h5>Comments</h5>
                                <b-form-group id="check-in-input-comments" v-bind:label="newCheckIn.comments.label" label-for="comments">
                                    <p class="pi-alert" v-if="elementFocus === 'comments'">
                                        <img alt="Alert Icon" src="../assets/exclamation-triangle-solid.svg"/> <strong>Remember: </strong> Do not include any personal information
                                    </p>
                                    <b-form-textarea
                                            id="comments"
                                            v-model="newCheckIn.comments.value"
                                            placeholder="Response"
                                            @focus="elementFocus = 'comments'"
                                            @blur="elementFocus = 'null'"
                                            rows="3"
                                    ></b-form-textarea>
                                </b-form-group>
                                <h5>Call Outcome &amp; Follow-up</h5>
                                <b-form-group id="check-in-input-status" label="Choose an outcome and indicate if a follow-up is needed">
                                    <b-form-radio required v-model="newCheckIn.status" name="question-status" value="Spoke to owner. No follow-up needed.">Spoke to owner.  No follow-up needed.</b-form-radio>
                                    <b-form-radio required v-model="newCheckIn.status" name="question-status" value="Spoke to owner. Follow-up needed.">Spoke to owner.  Follow-up needed.</b-form-radio>
                                    <hr/>
                                    <b-form-radio required v-model="newCheckIn.status" name="question-status" value="Spoke to someone besides owner. No follow-up needed.">Spoke to someone besides owner.  No follow-up needed.</b-form-radio>
                                    <b-form-radio required v-model="newCheckIn.status" name="question-status" value="Spoke to someone besides owner. Follow-up needed.">Spoke to someone besides owner.  Follow-up needed.</b-form-radio>
                                    <hr/>
                                    <b-form-radio required v-model="newCheckIn.status" name="question-status" value="Called. No Answer. Left a message.">Called.  No Answer.  Left a message.</b-form-radio>
                                    <b-form-radio required v-model="newCheckIn.status" name="question-status" value="Called. No Answer. Did not leave a message.">Called.  No Answer.  Did not leave a message.</b-form-radio>
                                    <b-form-radio required v-model="newCheckIn.status" name="question-status" value="Wrong number">Wrong Number</b-form-radio>
                                </b-form-group>
                                <b-button type="submit" variant="primary">Submit Check-In</b-button>
                                <b-button type="reset" variant="outline-secondary">Reset</b-button>
                            </b-form>
                        </b-card>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-modal v-if="lastCheckIn" id="checkin-detail-modal" size="lg" v-bind:title="entity.name + ' Previous Check-In'" @hidden="setLastCheckInData">
            <div v-if="lastCheckIn.comments.value !== ''">
                <h5>Check-In Comments</h5>
                <p>{{ lastCheckIn.comments.value }}</p>
            </div>
            <hr />
            <h6>Check-In Time: {{ lastCheckIn.date | timestamp }}</h6>
            <hr />
            <question-readout v-for="(question, index) in lastCheckIn.questionnaire.questions" :question="question" :number="index" :key="index"/>
            <template v-slot:modal-footer="{ close }">
                <b-button size="md" variant="primary" @click="close()">
                    Close
                </b-button>
            </template>
        </b-modal>
    </b-container>
</template>

<script>
    import questionReadout from "./questionReadout";

    export default {
        name: "Facility",
        components: {
            questionReadout
        },
        data() {
            return {
                entity: {
                    name: "Loading..."
                },
                entityCheckIn: {
                    name: null
                },
                showForm: true,
                lastCheckIn: null,
                elementFocus: null,
                lastCheckInStatus: {
                    state: "dark",
                    status: "Unknown"
                },
                newCheckIn: {
                    status: null,
                    date: null,
                    questionnaire: {
                        questions: [
                            {
                                parts: [
                                    {
                                        label: 'Have you seen the recommendations by the State called the "Recommendations for infection control & prevention of COVID-19 in facilities serving older adults"?',
                                        value: [
                                            null
                                        ]
                                    }
                                ]
                            },
                            {
                                parts: [
                                    {
                                        label: "Is your location limiting visitors?",
                                        value: [
                                            null
                                        ]
                                    },
                                    {
                                        label: "How many patients do you have at your facility?",
                                        value: [
                                            null
                                        ]
                                    },
                                    {
                                        label: "Are they actively screening and monitoring for those who are sick for both those who are patients and employees? (looking for signs/symptoms of cough fever, shortness of breath or taking temperatures)",
                                        value: [
                                            null
                                        ]
                                    },
                                    {
                                        label: "Has your location stopped having congregate meals?",
                                        value: [
                                            null
                                        ]
                                    },
                                    {
                                        label: "Has your location posted signs for handwashing?",
                                        value: [
                                            null
                                        ]
                                    }
                                ]
                            },
                            {
                                parts: [
                                    {
                                        label: "How is your facility handling leave of absences from nursing homes (i.e. doctor's visits, dialysis, and outside medical visits)?",
                                        value: [
                                            null
                                        ]
                                    }
                                ]
                            },
                            {
                                parts: [
                                    {
                                        label: "We would like to send you more materials. What is the best way? (Fax number or email)",
                                        value: [
                                            null
                                        ]
                                    }
                                ]
                            },
                            {
                                parts: [
                                    {
                                        label: "Do you need any additional supplies?",
                                        value: [
                                            null,
                                            null,
                                            null
                                        ]
                                    },
                                    {
                                        label: "Other issues or needs (i.e. PPE)",
                                        value: [
                                            null
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    comments: {
                        label: "Any additional comments?",
                        value: null
                    }
                }
            }
        },
        methods: {
            updateFacilityData(obj) {
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
                    let emptyContact = {
                        phone: [],
                        email: []
                    };
                    this.entity.contacts = this.duplicateData(emptyContact);
                    this.entityCheckIn.contacts = this.duplicateData(emptyContact);
                }
            },
            toggleForm(){
                this.resetCheckin();
                this.showForm = true;
            },
            resetCheckin() {
                this.newCheckIn.questionnaire.questions[0].parts[0].value[0] = null;
                this.newCheckIn.questionnaire.questions[1].parts[0].value[0] = null;
                this.newCheckIn.questionnaire.questions[1].parts[1].value[0] = null;
                this.newCheckIn.questionnaire.questions[1].parts[2].value[0] = null;
                this.newCheckIn.questionnaire.questions[1].parts[3].value[0] = null;
                this.newCheckIn.questionnaire.questions[1].parts[4].value[0] = null;
                this.newCheckIn.questionnaire.questions[2].parts[0].value[0] = null;
                this.newCheckIn.questionnaire.questions[3].parts[0].value[0] = null;
                this.newCheckIn.questionnaire.questions[4].parts[0].value[0] = null;
                this.newCheckIn.questionnaire.questions[4].parts[0].value[1] = null;
                this.newCheckIn.questionnaire.questions[4].parts[0].value[2] = null;
                this.newCheckIn.questionnaire.questions[4].parts[1].value[0] = null;
                this.newCheckIn.comments.value = null;
                this.newCheckIn.status = null;
            },
            addNewCheckin() {
                this.showForm = false;
                this.newCheckIn.date = new Date();
                this.entity.checkIn.checkIns.push(this.newCheckIn);
                this.entityCheckIn.checkIn = this.newCheckIn;
                this.$root.apiPUTRequest("/entity", this.entityCheckIn, this.setLastCheckInData);
            },
            getEntity() {
                this.$root.apiGETRequest("/entity/" + this.$route.params.entityID, this.updateFacilityData);
            },
            duplicateData(object){
                return JSON.parse(JSON.stringify(object));
            },
            setLastCheckInData() {
                console.log("set data");
                if(this.entity.checkIn.checkIns[this.entity.checkIn.checkIns.length-1]) {
                    this.lastCheckIn = this.duplicateData(this.entity.checkIn.checkIns[this.entity.checkIn.checkIns.length-1]);
                    this.lastCheckInStatus.status = this.lastCheckIn.status;
                }

                switch(this.lastCheckInStatus.status) {
                    case "Spoke to owner. No follow-up needed.":
                        this.lastCheckInStatus.state = "success";
                        break;
                    case "Spoke to someone besides owner. No follow-up needed.":
                        this.lastCheckInStatus.state = "success";
                        break;
                    case "Spoke to owner. Follow-up needed.":
                        this.lastCheckInStatus.state = "warning";
                        break;
                    case "Spoke to someone besides owner. Follow-up needed.":
                        this.lastCheckInStatus.state = "warning";
                        break;
                    case "Called. No answer. Left a message.":
                        this.lastCheckInStatus.state = "danger";
                        break;
                    case "Called. No answer. Did not leave a message.":
                        this.lastCheckInStatus.state = "danger";
                        break;
                    case "Wrong number":
                        this.lastCheckInStatus.state = "danger";
                        break;
                }
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
    .pi-alert {
        font-size: 12px;
        margin-top: 12px;
    }
    .pi-alert img {
        width: 16px;
        height: 16px;
        margin-right: 8px;
        margin-top: -2px;
    }
</style>