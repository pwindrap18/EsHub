import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Tournaments from "./views/Tournaments.vue";
import Links from "./views/Links.vue";
import Platform from "./views/Platform.vue";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/tournaments/:id",
      name: "tournaments",
      component: Tournaments
    }, {
      path: "/links",
      name: "links",
      component: Links
    },
    {
      path: "/platform",
      name: "platform",
      component: Platform
    }
  ]
});