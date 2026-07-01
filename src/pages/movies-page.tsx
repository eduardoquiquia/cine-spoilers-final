import { useEffect, useMemo, useState } from "react";

import PageContainer from "@/components/layout/page-container";
import MoviesList from "@/components/movies/movies-list";
import MoviesPageHeader from "@/components/movies/movies-page-header";
import MoviesSearch from "@/components/movies/movies-search";

import tmdbService from "@/services/tmdb.service";
import type { Movie } from "@/types/movie";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await tmdbService.getPopular();
        setMovies(data);
      } catch (error) {
        console.error("Error obteniendo películas", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const genres = useMemo(() => {
    // TMDB devuelve genre_ids, así que por ahora no tendremos filtro real.
    return [];
  }, []);

  const filteredMovies = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(normalizedSearch)
    );
  }, [movies, searchTerm]);

  if (loading) {
    return (
      <PageContainer>
        <h2>Cargando películas...</h2>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <MoviesPageHeader />

      <MoviesSearch
        genres={genres}
        resultsCount={filteredMovies.length}
        searchTerm={searchTerm}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        onSearchTermChange={setSearchTerm}
      />

      <MoviesList movies={filteredMovies} />
    </PageContainer>
  );
};

export default MoviesPage;
