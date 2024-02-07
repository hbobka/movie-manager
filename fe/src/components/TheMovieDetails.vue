<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Movie } from "../models/movie";
import BaseButton from "../components/BaseButton.vue";
import router from "@/router";

const APP_URL = "ec2-3-76-105-215.eu-central-1.compute.amazonaws.com";

const props = defineProps<{ movieId: string }>();
const isLoading = ref(false);
const isNew = props.movieId === "new";

const movie = ref<Movie>({
  name: "",
  year: 0,
  genres: [],
  ageLimit: 0,
  rating: 0,
  actors: [
    {
      firstName: "",
      lastName: "",
    },
  ],
  director: {
    firstName: "",
    lastName: "",
  },
  synopsis: "",
});

const getMovieById = async () => {
  try {
    isLoading.value = true;

    const response = await fetch(
      `http://${APP_URL}:3000/movies/${props.movieId}`
    );

    const json = await response.json();
    movie.value = json.movie;

    isLoading.value = false;
  } catch (error) {
    console.log("Movie not found: ", error);
  }
};

const handleSave = async () => {
  try {
    await fetch(`http://${APP_URL}:3000/movies/${props.movieId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie.value),
    });
    router.push({ name: "movieview" });
  } catch (error) {
    console.log("Movie not found: ", error);
  }
};

const handleCreate = async () => {
  try {
    await fetch(`http://${APP_URL}:3000/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie.value),
    });
    router.push({ name: "movieview" });
  } catch (error) {
    console.log("Movie not found: ", error);
  }
};

onMounted(async () => {
  if (!isNew) {
    await getMovieById();
  }
});
</script>

<template>
  <section class="create-movies-list-wrapper" v-if="!isLoading">
    <form action="">
      <label for="title">Name:</label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Name"
        v-model="movie.name"
      />
      <label for="year">Year:</label>
      <input
        type="number"
        name="year"
        id="year"
        placeholder="Year"
        v-model="movie.year"
      />
      <label for="ageLimit">Age Limit:</label>
      <input
        type="number"
        name="ageLimit"
        id="ageLimit"
        placeholder="Age Limit"
        v-model="movie.ageLimit"
      />
      <label for="rating">Rating:</label>
      <input
        type="number"
        name="rating"
        id="rating"
        placeholder="Rating"
        v-model="movie.rating"
      />
      <label for="title">Synopsis:</label>
      <input
        type="text"
        name="synopsis"
        id="synopsis"
        placeholder="Synopsis"
        v-model="movie.synopsis"
      />
    </form>
    <BaseButton @click="handleSave" class="movies-delete-button" v-if="!isNew"
      >Save</BaseButton
    >
    <BaseButton @click="handleCreate" class="movies-delete-button" v-if="isNew"
      >Create</BaseButton
    >
  </section>
</template>

<style scoped>
section.create-movies-list-wrapper {
  margin: 1rem auto;
  width: 80%;
}

input {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.2rem;
  padding: 0.5rem;
  margin: 0.5rem 0;
}

button.movies-delete-button {
  float: right;
  margin-top: 1rem;
}
</style>
