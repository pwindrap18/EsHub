import Vue from "vue";
import Vuex from "vuex";
import news from "./modules/news.js"
import tournaments from "./modules/tournaments.js"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    news,
    tournaments
  }
});