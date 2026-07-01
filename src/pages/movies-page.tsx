import { useEffect, useMemo, useState } from "react";

import PageContainer from "@/components/layout/page-container";
import MoviesList from "@/components/movies/movies-list";
import MoviesPageHeader from "@/components/movies/movies-page-header";
import MoviesSearch from "@/components/movies/movies-search";

import { useMovieStore } from "@/store/movie.store";

const MoviesPage = () => {
  const { movies, loading, fetchPopularMovies } = useMovieStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  useEffect(() => {
    fetchPopularMovies();
  }, [fetchPopularMovies]);

  const genres = useMemo(() => {
    // Más adelante obtendremos los géneros desde TMDB.
    return [];
  }, []);

  const filteredMovies = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

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