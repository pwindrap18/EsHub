<template>
  <v-container fluid grid-list-xs>
    <v-layout row wrap>
      <v-flex lg4 v-for="Anews in news" :key="Anews.title" grow>
        <Card :news="Anews"></Card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Dropdown from "../components/Dropdown";
import Card from "@/components/Card";

export default {
  components: {
    Dropdown,
    Card,
    show: false
  },
  data() {
    return {
      news: []
    };
  },
  created() {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=gb&category=technology&apiKey=80bf7c5cba2947b7bde52c231d0f5876"
      )
      .then(response => {
        this.news = response.data.articles;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
