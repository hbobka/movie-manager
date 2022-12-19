export interface Movie {
  id?: string;
  name: string;
  year: number;
  genres: string[];
  ageLimit: number;
  rating: number;
  actors: { firstName: string; lastName: string }[];
  director: { firstName: string; lastName: string };
  synopsis: string;
}
