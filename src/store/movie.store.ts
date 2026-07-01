import { create } from "zustand";

import tmdbService from "@/services/tmdb.service";
import type { Movie } from "@/types/movie";

interface MovieStore {
    movies: Movie[];
    loading: boolean;
    error: string | null;

    fetchPopularMovies: () => Promise<void>;
}

export const useMovieStore = create<MovieStore>((set) => ({
    movies: [],
    loading: false,
    error: null,

    fetchPopularMovies: async () => {
        set({
        loading: true,
        error: null,
        });

        try {
        const movies = await tmdbService.getPopular();

        set({
            movies,
            loading: false,
        });
        } catch (error) {
        set({
            loading: false,
            error: "Error obteniendo películas.",
        });

        console.error(error);
        }
    },
}));