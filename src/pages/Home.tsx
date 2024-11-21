import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GenreButton } from '../components/GenreButton';
import { genres } from '../data/genres';

export function Home() {
  const navigate = useNavigate();

  // Obtener el número de respuestas correctas desde localStorage para cada género v2
  const getCorrectAnswersCount = (genreId: string) => {
    const savedCorrectAnswers = localStorage.getItem(`correctAnswers_${genreId}`);
    return savedCorrectAnswers ? new Set(JSON.parse(savedCorrectAnswers)).size : 0;
  };

  return (
    <div className="min-h-screen bg-purple-50 p-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">QUIZZILM</h1>
        <p className="text-gray-600">¿Cuanto sabes de pelis?</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {genres.map((genre) => {
          // Obtener la cantidad de respuestas correctas para este género
          const correctCount = getCorrectAnswersCount(genre.id);

          return (
            <GenreButton
              key={genre.id}
              genre={genre}
              correctCount={correctCount}
              onClick={() => navigate(`/game/${genre.id}`)}
            />
          );
        })}
      </div>
      
    </div>
  );
}