import api from "./http-client";
import type { MoviesResponse, Movie } from "../types/movie";

class TMDBService {

    async getPopular(): Promise<Movie[]> {
        const response = await api.get<MoviesResponse>("/movie/popular");

        return response.data.results;
    }

    async getNowPlaying(): Promise<Movie[]> {
        const response = await api.get<MoviesResponse>("/movie/now_playing");

        return response.data.results;
    }

    async getTopRated(): Promise<Movie[]> {
        const response = await api.get<MoviesResponse>("/movie/top_rated");

        return response.data.results;
    }

    async getUpcoming(): Promise<Movie[]> {
        const response = await api.get<MoviesResponse>("/movie/upcoming");

        return response.data.results;
    }

    async getMovie(id: number): Promise<Movie> {
        const response = await api.get<Movie>(`/movie/${id}`);

        return response.data;
    }

    async search(query: string): Promise<Movie[]> {
        const response = await api.get<MoviesResponse>("/search/movie", {
            params: {
                query,
            },
        });

        return response.data.results;
    }

}

export default new TMDBService();