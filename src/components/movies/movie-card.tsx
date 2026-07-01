import { Link } from "react-router-dom";

import type { Movie } from "@/types/movie";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <article>
      <Card className="overflow-hidden">
        <img
          src={`${import.meta.env.VITE_TMDB_IMAGE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="aspect-[2/3] w-full object-cover"
        />

        <CardHeader className="gap-3">
          <Badge
            variant="secondary"
            className="w-fit"
          >
            ⭐ {movie.vote_average.toFixed(1)}
          </Badge>

          <CardTitle>{movie.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
            {movie.overview}
          </p>

          <Link
            to={`/movies/${movie.id}`}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            View details
          </Link>
        </CardContent>
      </Card>
    </article>
  );
};

export default MovieCard;