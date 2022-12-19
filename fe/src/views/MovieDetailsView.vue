<script setup lang="ts">
import { onMounted } from "vue";
import route from "@/router";
import { ref } from "vue";
import TheMovieDetails from "../components/TheMovieDetails.vue";

const movieId = ref("");

onMounted(() => {
  movieId.value = route.currentRoute.value.params.movieId.toString();
});
</script>

<template>
  <main v-if="movieId">
    <TheMovieDetails :movieId="movieId" />
  </main>
</template>
