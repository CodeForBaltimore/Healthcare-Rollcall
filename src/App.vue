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
    const role = this.$jwt.decode(this.$root.auth_token).type;
    return {
      user,
      navBar,
      role,
      disableBackBtn: [
        "dashboard",
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

<style>
#app {
  font-family: "Open Sans", OpenSans, Open-Sans, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  width: 100%;
  margin: auto;
}

#primary-nav {
  background-color: #31363c;
  height: 120px;
}

#primary-nav .container-md,
#secondary-nav .container-md {
  padding: 0 15px;
}

#secondary-nav {
  background-color: #42484f;
  height: 50px;
  margin-bottom: 30px;
  font-weight: 600;
  font-size: 14px;
}

#secondary-nav .nav-item > a {
  color: #ffffff;
  opacity: 1;
}

#secondary-nav .nav-item > a:hover {
  opacity: 0.8;
}

body {
  background-color: #f0f0f0;
}

h1 {
  padding: 0;
  margin-top: 0;
}

#dashboard-table a {
  color: #006EE3 !important;
}

p.lead {
  font-size: 18px;
  font-weight: unset;
  margin-top: 30px;
}

nav#primary-nav img.seal {
  height: 88px;
  width: 88px;
  max-width: 88px;
  max-height: 88px;
}

nav#primary-nav img.app-logo {
  height: 60px;
  max-height: 60px;
  margin-left: 15px;
}

strong {
  font-weight: bold;
}

#footer {
  margin: 60px auto;
  text-align: center;
}

.branding-link {
  cursor: pointer;
}

.multiselect__tags {
  min-height: 40px;
  display: block;
  padding: 8px 40px 0 8px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  background: #fff;
  font-size: 14px;
}

.multiselect__option--highlight {
  background: #42484f;
  outline: none;
  color: white;
}

.multiselect__option--highlight {
  background: #42484f;
  outline: none;
  color: white;
}

.multiselect__option--highlight:after {
  content: attr(data-select);
  background: #42484f;
  color: white;
}

.multiselect__option--selected {
  background: #f3f3f3;
  color: #35495e;
  font-weight: bold;
}

.multiselect__option--selected:after {
  content: attr(data-selected);
  color: silver;
}

.multiselect__option--selected.multiselect__option--highlight {
  background: #ff6a6a;
  color: #fff;
}

.multiselect__option--selected.multiselect__option--highlight:after {
  background: #ff6a6a;
  content: attr(data-deselect);
  color: #fff;
}

.multiselect--disabled .multiselect__current,
.multiselect--disabled .multiselect__select {
  background: #ededed;
  color: #a6a6a6;
}

ul.navbar-nav.ml-auto li:last-child a {
  padding-right: 0;
}

ul.navbar-nav.ml-auto li:last-child a::after {
  display: none !important;
}

.nav--role {
  font-weight: 100 !important;
  padding-right: 0.3rem;
}
</style>
