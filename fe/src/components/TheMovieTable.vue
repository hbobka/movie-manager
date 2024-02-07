<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import router from "@/router";
import type { Movie } from "../models/movie";
import BaseTile from "../components/BaseTile.vue";
import BaseButton from "../components/BaseButton.vue";
import IconStar from "../components/icons/IconStar.vue";
import IconDelete from "../components/icons/IconDelete.vue";

const movies = ref<Movie[]>([]);
const isLoading = ref(false);
const searchTerm = ref("");
const APP_URL = "ec2-3-76-105-215.eu-central-1.compute.amazonaws.com";


const getAllMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`http://${APP_URL}:3000/movies`);
    const json = await response.json();

    return json.movies;
  } catch (error) {
    console.log(`Movies could not be fetched: ${error}`);
  }
  return [];
};

const filteredMovies = computed(() => {
  return movies.value?.filter((movie) => {
    return movie.name.toLowerCase().includes(searchTerm.value.toLowerCase());
  });
});

const handleDelete = async (id: any) => {
  await fetch(`http://${APP_URL}:3000/movies/${id}`, { method: "DELETE" });

  const movieIndex = movies.value.findIndex((movie) => movie.id === id);
  movies.value.splice(movieIndex, 1);
};

// get all movies when component mounts
onMounted(async () => {
  isLoading.value = true;
  movies.value = await getAllMovies();
  isLoading.value = false;
});
</script>

<template>
  <section class="movies-list-wrapper">
    <input
      class="movies-search"
      type="text"
      v-model="searchTerm"
      placeholder="Search..."
    />
    <ul v-if="!isLoading" class="movies-list">
      <li
        v-for="movie in filteredMovies"
        :key="movie.id"
        class="movies-item"
        @click="
          router.push({ name: 'moviedetails', params: { movieId: movie.id } })
        "
      >
        <BaseTile class="movies-tile-wrapper">
          <div>
            <h3>{{ movie.name }} ({{ movie.year }})</h3>
            <span v-for="star in movie.rating" :key="star"><IconStar /></span>
            <p>{{ movie.synopsis }}</p>
          </div>
          <BaseButton
            @click="handleDelete(movie.id)"
            class="movies-delete-button"
            ><IconDelete
          /></BaseButton>
        </BaseTile>
      </li>
    </ul>
  </section>
</template>

<style scoped>
section.movies-list-wrapper {
  margin: 1rem auto;
  width: 80%;
}

input.movies-search {
  width: 100%;
  border: none;
  outline: none;
  border-bottom: 1px solid #ccc;
  padding: 0.5rem;
}

ul.movies-list {
  margin: 1rem 0;
}

li.movies-item {
  list-style: none;
  margin: 0.5rem 0;
}

.movies-tile-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.movies-tile-wrapper:hover {
  background: #f2f2f2;
}

.movies-tile-wrapper h3 {
  margin: 0 0.5rem 0.5rem 0;
  display: inline-block;
}
.movies-tile-wrapper p {
  opacity: 0.75;
}

.movies-delete-button {
  margin: 0 0 0 1rem;
  padding: 0.5rem;
}
</style>
