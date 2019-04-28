<template>
  <v-hover>
    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 21 : 2}`">
      <router-link :to="`/tournaments/${tourney._id}`">
        <v-img class="white--text" height="125px" :src="getImg(tourney.image)">
          <v-container fill-height>
            <v-layout fill-height align-center></v-layout>
          </v-container>
        </v-img>
      </router-link>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "TourneyCard",
  props: ["tourney"],
  methods: {
    getImg(img) {
      let image = "";
      if (img && img !== "img.jpeg") {
        image = `http://localhost:3000/${img}`;
      } else {
        image =
          "https://shenandoahcountyva.us/bos/wp-content/uploads/sites/4/2018/01/picture-not-available-clipart-12.jpg";
      }

      return image;
    }
  }
};
</script>

<style>
</style>
