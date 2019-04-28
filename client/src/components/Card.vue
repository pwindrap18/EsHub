<template>
  <div>
    <v-hover>
      <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 21 : 2}`">
        <v-img class="white--text" height="200px" :src="getImg(news.urlToImage)">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox></v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <span class="caption">{{news.title}}</span>
        </v-card-title>
        <v-card-actions>
          <a :href="news.url" target="_blank">
            <v-btn flat small>Details</v-btn>
          </a>
          <v-btn flat small>Share</v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Card",
  props: ["news"],
  data() {
    return {
      // date: this.news.publishedAt,
    };
  },
  methods: {
    dateFormat() {
      // const date = new Date(this.date);
      // return date.toDateString();
    },
    getImg(img) {
      if (img) {
        return img;
      } else {
        return "https://shenandoahcountyva.us/bos/wp-content/uploads/sites/4/2018/01/picture-not-available-clipart-12.jpg";
      }
    }
  }
};
</script>

<style>
</style>
