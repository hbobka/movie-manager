import { createRouter, createWebHistory } from "vue-router";
import MovieView from "../views/MovieView.vue";
import MovieDetailsView from "../views/MovieDetailsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "movieview",
      component: MovieView,
    },
    {
      path: "/moviedetails/:movieId",
      name: "moviedetails",
      component: MovieDetailsView,
    },
  ],
});

export default router;
