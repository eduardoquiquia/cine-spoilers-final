import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageContainer from "@/components/layout/page-container";
import tmdbService from "@/services/tmdb.service";

import type { Movie } from "@/types/movie";

const MovieDetailPage = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadMovie = async () => {
      try {
        const data = await tmdbService.getMovie(Number(id));
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <PageContainer>
        <h2>Cargando...</h2>
      </PageContainer>
    );
  }

  if (!movie) {
    return (
      <PageContainer>
        <h2>Película no encontrada</h2>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1>{movie.title}</h1>

      <img
        src={`${import.meta.env.VITE_TMDB_IMAGE_URL}${movie.poster_path}`}
        alt={movie.title}
        width={300}
      />

      <p>{movie.overview}</p>

      <p>
        ⭐ {movie.vote_average}
      </p>

      <p>
        Estreno: {movie.release_date}
      </p>
    </PageContainer>
  );
};

export default MovieDetailPage;