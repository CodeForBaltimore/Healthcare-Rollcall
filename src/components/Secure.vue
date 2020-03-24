<template>
    <div id="secure">
        <h1>Secure Area</h1>
        <b-container>
            <table class="table">
                <tr>
                    <td>Name</td>
                    <td>Checked In</td>
                    <td>Updated</td>
                </tr>
                <tr v-for="entity in entities" v-bind:key="entity.id">
                    <td><router-link :to="{ name: 'facility', params: { entityID: entity.id }}">{{ entity.name }}</router-link></td>
                    <td>{{ entity.checkIn }}</td>
                    <td>{{ entity.updatedAt }}</td>
                </tr>
            </table>
        </b-container>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'secure',
        data() {
            return {
                api: this.$root.$data.apiEndpoint,
                entities: null
            }
        },
        methods: {
            updateEntities(obj) {
                this.entities = obj;
            }
        },
        created() {
            let self = this;
            axios
                .get(self.api + '/entity')
                .then(function(response) {
                    self.updateEntities(response.data.results);
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    }
</script>

<style scoped>
    #secure {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }
</style>