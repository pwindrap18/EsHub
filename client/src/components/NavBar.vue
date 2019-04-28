<template>
  <div class="navbar">
    <v-toolbar app extended>
      <router-link to="/">
        <v-img src="/pepesad.png" height="40px" width="40px" contain></v-img>
      </router-link>
      <v-toolbar-title>
        <span class="font-weight-light">ES</span>
        <span class="font-weight-bold">HUB</span>
      </v-toolbar-title>
      <template v-slot:extension>
        <div class="hidden-sm-and-down">
          <router-link to="/tournaments">
            <v-btn flat>Tournaments</v-btn>
          </router-link>

          <router-link to="/schedule">
            <v-btn flat>Schedule</v-btn>
          </router-link>

          <Dropdown></Dropdown>
        </div>
      </template>
      <v-spacer></v-spacer>

      <v-btn flat dark small icon class="hidden-md-and-up mr-0" @click="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" absolute temporary width="200px" right>
      <v-list class="pt-0" dense>
        <v-list-tile v-for="item in items" :key="item.title" route :to="item.route">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>LIVE STREAM</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile v-for="link in links" :key="link.title" route :to="link.route">
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>


<script>
import Dropdown from "./Dropdown";

export default {
  name: "NavBar",
  data() {
    return {
      drawer: null,
      items: [
        { title: "TOURNAMENTS", route: "/tournaments" },
        { title: "SCHEDULE", route: "/Schedule" }
      ],
      links: [
        { title: "Links", route: "/links" },
        { title: "Platform", route: "/platform" }
      ]
    };
  },
  components: {
    Dropdown
  }
};
</script>

<style>
</style>
