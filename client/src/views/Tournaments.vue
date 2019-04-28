<template>
  <v-container grid-list-md>
    <v-layout>
      <v-img height="300px" :src="getImg(tourney.image)"></v-img>
    </v-layout>

    <v-layout row wrap>
      <v-flex lg8>
        <v-card>
          <v-toolbar dense>
            <v-toolbar-title>Structures</v-toolbar-title>
          </v-toolbar>
          <v-sheet>
            <v-card>
              <v-container>{{myHTML}}</v-container>
            </v-card>
          </v-sheet>
          <wysiwyg v-model="myHTML"/>
        </v-card>
      </v-flex>
      <v-flex lg4>
        <v-card>
          <v-toolbar dense>
            <v-toolbar-title>Live Streams</v-toolbar-title>
          </v-toolbar>
          <v-sheet>
            <v-container>
              <v-expansion-panel>
                <v-expansion-panel-content v-for="live in tourney.liveStreams" :key="live.platform">
                  <template v-slot:header>
                    <div>{{live.platform}}</div>
                  </template>
                  <v-card>
                    <v-card-text>
                      <a :href="live.url" target="_blank">
                        <v-btn round dark large block outline flat color="blue">
                          <v-icon large>games</v-icon>
                        </v-btn>
                      </a>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-container>
          </v-sheet>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      myHTML: ""
    };
  },
  computed: mapGetters(["tourney"]),
  methods: {
    ...mapActions(["fetchOneTourney"]),
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
  },
  mounted() {
    this.fetchOneTourney(this.$route.params.id);
  }
};
</script>

<style>
</style>

