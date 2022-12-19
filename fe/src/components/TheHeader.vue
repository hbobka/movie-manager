<script setup lang="ts">
import router from "@/router";
import IconStarWhite from "../components/icons/IconStarWhite.vue";
</script>

<template>
  <header>
    <div class="header-content-wrapper">
      <p class="header-logo" @click="router.push('/')">GOFORE Movies</p>
      <IconStarWhite
        @click="
          router.push({ name: 'moviedetails', params: { movieId: 'new' } })
        "
        class="movie-create-button"
      />
    </div>
  </header>
</template>

<style scoped>
header {
  background: #ff7200;
  height: 5rem;
  display: flex;
  justify-content: center;
}

.header-content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
}

.header-logo:hover {
  cursor: pointer;
}

.movie-create-button {
  width: 2rem;
  height: 2rem;
}

.movie-create-button:hover {
  cursor: pointer;
}

header p {
  color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
