import movieData from "./movies-compact-1.json";

const setupData = async () => {
  try {
    for (const movie of movieData) {
      await fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie),
      });
    }
  } catch (error) {
    console.log(`Data could not be stored: ${error}`);
  }
};

setupData();
