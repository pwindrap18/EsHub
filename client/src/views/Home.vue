<template>
  <v-container justify-center grid-list-md>
    <v-layout>
      <v-flex lg8>
        <v-container fluid grid-list-lg>
          <div>
            <span class="title">NEWS</span>
          </div>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex lg4 v-for="news in allNews" :key="news.id">
              <Card :news="news"></Card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex lg4 hidden-sm-and-down>
        <v-container fluid grid-list-md>
          <div>
            <span class="title">Tournaments</span>
          </div>
          <v-divider></v-divider>
          <v-layout column wrap fill-height>
            <!-- <v-img src="https://i.imgur.com/uf9YNVm.png" height="400px"></v-img>
            <span
              class="body-2"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates in odio, molestias perferendis doloribus, error porro suscipit totam ad unde quam aliquid enim numquam quo at possimus blanditiis rerum similique. Ducimus alias excepturi error laudantium, enim dignissimos consequatur qui ipsa.</span>-->
            <v-flex lg4 v-for="tourney in allTourney" :key="tourney.id" grow>
              <TourneyCard :tourney="tourney"></TourneyCard>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Dropdown from "../components/Dropdown";
import Card from "@/components/Card";
import TourneyCard from "@/components/TourneyCard";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    TourneyCard,
    Dropdown,
    Card
  },
  data() {
    return {};
  },
  computed: mapGetters(["allNews", "allTourney"]),
  methods: {
    ...mapActions(["fetchNews", "fetchTourney"])
  },
  created() {
    this.fetchNews();
    this.fetchTourney();
  }
};
</script>
