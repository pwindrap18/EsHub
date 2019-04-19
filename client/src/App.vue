<template>
  <v-app dark>
    <NavBar/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import Card from "@/components/Card";

export default {
  name: "App",
  components: {
    NavBar,
    Card
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
