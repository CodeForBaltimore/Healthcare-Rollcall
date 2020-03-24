<template>
    <div id="facility">
        <h1>{{ data.name }}</h1>

    </div>
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

</style>