<template>
  <b-container fluid="md" id="secure">
    <h1>Dashboard</h1>
    <h3>Hello {{this.$jwt.decode(this.$root.getSavedToken()).email}}</h3>
    <b-row>
      <b-col>
        <!-- Dashboard Table -->
        <table class="table">
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Updated</td>
          </tr>
          <tr v-for="entity in entities" v-bind:key="entity.id">
            <td>
              <router-link
                :to="{ name: 'facility', params: { entityID: entity.id }}"
              >{{ entity.name }}</router-link>
            </td>
            <td>{{ entity.checkIn[0] }}</td>
            <td>{{ entity.updatedAt }}</td>
          </tr>
        </table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

export default {
  name: "dashboard",
  data() {
    return {
      entities: null
    };
  },
  methods: {
    updateEntities(obj) {
      this.entities = obj;
    }
  },
  mounted() {
    this.updateEntities(
      this.$root.apiRequest("/entity")
    );
  }
};
</script>

<style scoped>
h1 {
  text-align: left;
}
</style>