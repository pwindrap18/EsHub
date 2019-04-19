<template>
  <v-menu open-on-hover offset-y dark open-delay="300">
    <v-btn flat dark slot="activator">
      <v-icon dark left>expand_more</v-icon>Live Stream
    </v-btn>
    <v-list>
      <v-list-tile v-for="item in items" :key="item.title" router :to="item.link">
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Links", link: "/links" },
      { title: "Platform", link: "/platform" }
    ]
  })
};
</script>

<style>
</style>
