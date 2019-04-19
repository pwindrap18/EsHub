<template>
  <div>
    <v-card>
      <v-img class="white--text" height="200px" :src="getImg(news.urlToImage)">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox]>
              <span class="headline">{{news.title}}</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>
      <v-card-title>
        <div>
          <span>{{ news.author}}</span>
          <br>
          <span>Published At {{dateFormat()}}</span>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="orange" @click="dialog=true">Details</v-btn>
        <v-btn flat color="orange">Share</v-btn>
      </v-card-actions>
    </v-card>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" width="600px">
        <v-card>
          <v-card-title class="headline" primary-title>{{news.title}}</v-card-title>

          <v-card-text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum deleniti id quam exercitationem. Dolorum, veniam eaque. Obcaecati dicta rem eum laudantium deleniti iure debitis cumque quisquam, sapiente dolore esse sint minima facere nesciunt. Aspernatur saepe voluptates tenetur, illo dolores eum molestiae dolor qui repudiandae illum quod maiores quos atque minima officiis hic similique? Nihil mollitia neque ad praesentium provident, corporis, pariatur ducimus quis numquam ea soluta quae quaerat cum. Consequuntur animi vero, consectetur officiis veniam minima commodi. Autem repellendus ex, delectus rerum molestias alias sunt cumque perferendis, est architecto, aliquam neque porro veritatis! Est in vel corrupti rem quibusdam ad sapiente atque ea, incidunt neque, nihil obcaecati eveniet consequatur facilis sequi id doloremque provident ipsa natus velit eos. At, animi ut pariatur earum ipsum minus excepturi sequi laborum asperiores quam atque, consequatur natus incidunt fugit, officia dolor facilis ullam sed fugiat? Sunt, nemo numquam quis dicta consectetur labore unde iste repudiandae id mollitia facere facilis pariatur. Doloremque deleniti officiis iure exercitationem dolore, optio omnis cum maxime assumenda hic nisi itaque quod. Consequatur quis assumenda culpa commodi, nam laborum facere earum porro, inventore accusamus, deleniti magni quibusdam maxime? Molestiae iste ea deserunt consectetur harum iusto, ullam reiciendis minus animi, nihil deleniti.</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="dialog = false">close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "card",
  props: ["news"],
  data() {
    return {
      date: this.news.publishedAt,
      dialog: false
    };
  },
  created() {},
  methods: {
    dateFormat() {
      const date = new Date(this.date);

      return date.toDateString();
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
