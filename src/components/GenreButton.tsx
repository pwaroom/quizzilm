import { motion } from 'framer-motion';
import type { Genre } from '../types';

interface GenreButtonProps {
  genre: Genre;
  onClick: () => void;
  correctCount: number;
}

export function GenreButton({ genre, onClick, correctCount }: GenreButtonProps) {

  // Calcular el progreso basado en las respuestas correctas
  const progress = (correctCount / genre.total) * 100;
  const isCompleted = progress === 100;

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`w-full p-4 rounded-xl text-left relative overflow-hidden ${
        isCompleted ? 'bg-purple-700' : 'bg-purple-600'
      } text-white mb-4`}
    >
      
      <div className="flex justify-between items-center mb-2">
        {/* Mostrar el nombre del género o el texto "Completado!" si ya está al 100% */}
        <span className="text-xl font-bold">
          {isCompleted ? (
            <>
              {genre.name} <span className="text-yellow-300 text-sm">Completado!</span>
            </>
          ) : (
            genre.name
          )}
        </span>

        <span className="text-2xl">{genre.emoji}</span>
      </div>

      {/* Barra de progreso */}
      <div className="w-full h-2 bg-purple-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-300 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      
      {isCompleted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 text-yellow-300 text-2xl"
        >
        </motion.div>
      )}
    </motion.button>
  );
}
