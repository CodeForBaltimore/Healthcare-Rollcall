<template>
  <div id="app">
    <b-navbar variant="faded" type="dark" id="primary-nav">
      <b-container fluid="md">
        <b-navbar-brand v-on:click="goToDashboard()" role="link" class="branding-link">
          <img alt="City of Baltimore Seal" src="./assets/balt-logo-white.png" class="seal"/>
          <img alt="Healthcare Roll Call" src="./assets/hcrc.svg" class="app-logo"/>
        </b-navbar-brand>
      </b-container>
    </b-navbar>
    <b-navbar type="dark" id="secondary-nav">
      <b-container fluid="md">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item
                v-on:click="goToDashboard()"
                v-if="checkNavBar && showDashboardLink()"
            >
              <span class="d-none d-md-block">
                <b-icon-arrow-left-circle class="mr-1"></b-icon-arrow-left-circle>
                Return to Dashboard
              </span>
              <span class="d-block d-md-none">
                <b-icon-arrow-left-circle></b-icon-arrow-left-circle>
              </span>
            </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto" v-if="checkNavBar">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>Management</template>
              <b-dropdown-item v-on:click="goToContacts()">Contacts</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                {{ user }} &middot; <span class="nav--role">{{ role }}</span>
                <b-icon-person-circle></b-icon-person-circle>
              </template>
              <b-dropdown-item v-on:click="logout()">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <router-view></router-view>
    <b-container fluid="md" id="footer">
      <img alt="Code for Baltimore Logo" src="./assets/CfB.png" width="200"/>
      <br/>
      <strong>
        Proudly Designed &amp; Developed by
        <a
            href="https://codeforbaltimore.org/"
            target="_blank"
        >Code for Baltimore</a>
      </strong>
      <br/>A local chapter of
      <a href="https://www.codeforamerica.org/" target="_blank">Code for America</a>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    const navBar = this.$root.getNavBarStatus();
    const user = this.$root.auth_token
        ? this.$jwt.decode(this.$root.auth_token).email
        : false;
    const role = this.$jwt.decode(this.$root.auth_token).type || '';
    return {
      user,
      navBar,
      role,
      disableBackBtn: [
        "dashboard",
        "link-contact",
        "create-contact",
        "update-contact",
        "facility"
      ]
    };
  },
  methods: {
    logout() {
      this.$root.destroySession();
      this.$router.push({name: "login"});
    },
    goBack() {
      this.$router.go(-1);
    },
    goToDashboard() {
      if (this.$router.currentRoute.name !== "dashboard") {
        this.$router.push({name: "dashboard"});
      }
    },
    showDashboardLink() {
      switch (this.$router.currentRoute.name) {
        case "dashboard":
          return false;
        case "update-contact":
          return false;
        case "create-contact":
          return false;
      }
      return true;
    },
    goToContacts() {
      if (this.$router.currentRoute.name !== "get-all-contacts") {
        this.$router.push({name: "get-all-contacts"});
      }
    },
    updateUser() {
      if (this.$root.auth_token) this.user = this.$jwt.decode(this.$root.auth_token).email
    }
  },
  computed: {
    checkNavBar() {
      this.updateUser()
      return this.$root.getNavBarStatus();
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
@import 'src/assets/styles/main';
</style>
