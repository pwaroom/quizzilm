import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MovieQuestion } from '../components/MovieQuestion';
import { movies } from '../data/movies';
import { genres } from '../data/genres';

export function Game() {
  const { genre } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<Set<number>>(new Set());

  const genreMovies = movies.filter((m) => 
    m.genre.toLowerCase() === genre?.toLowerCase()
  );

  // Verificar si la película actual ha sido respondida correctamente
 

   // Obtener la película actual y los datos del género
  const currentMovie = genreMovies[currentIndex];
  const genreData = genres.find((g) => g.id === genre);

  // Recuperar las respuestas correctas desde localStorage al cargar la página
  useEffect(() => {
    const savedCorrectAnswers = localStorage.getItem(`correctAnswers_${genre}`);
    if (savedCorrectAnswers) {
      setCorrectAnswers(new Set(JSON.parse(savedCorrectAnswers)));
    }
  }, [genre]);


  // Guardar las respuestas correctas en localStorage
  const handleCorrectAnswer = () => {
    const newCorrectAnswers = new Set(correctAnswers);
    newCorrectAnswers.add(currentMovie.id);
    setCorrectAnswers(newCorrectAnswers);

    localStorage.setItem(`correctAnswers_${genre}`, JSON.stringify(Array.from(newCorrectAnswers)));

    // Si todas las respuestas son correctas, redirigir a la pantalla de completado
    if (newCorrectAnswers.size === genreMovies.length) {
      navigate(`/completed/${genre}`);
    }
  };


  useEffect(() => {
    if (!currentMovie || !genreData) {
      navigate('/');
    }
  }, [currentMovie, genreData, navigate]);

  // Verificar si la película actual ha sido respondida correctamente
  const isAnswered = correctAnswers.has(currentMovie.id);


  if (!currentMovie || !genreData) return null;

  return (
    <MovieQuestion
      movie={currentMovie}
      onCorrectAnswer={handleCorrectAnswer}
      onPrevious={() => setCurrentIndex((i) => Math.max(0, i - 1))}
      onNext={() => setCurrentIndex((i) => Math.min(genreMovies.length - 1, i + 1))}
      correctCount={correctAnswers.size}
      totalQuestions={genreMovies.length}
      isAnswered={isAnswered}
    />
  );
}