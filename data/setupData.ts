import movieData from "./movies-compact-1.json";

const setupData = async () => {
  const APP_URL = "ec2-3-76-105-215.eu-central-1.compute.amazonaws.com";
  try {
    for (const movie of movieData) {
      await fetch(`http://${APP_URL}:3000/movies', {
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