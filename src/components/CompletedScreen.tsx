import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CompletedScreenProps {
  genre: string;
}

export function CompletedScreen({ genre }: CompletedScreenProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-purple-50 p-4">
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-purple-600"
        >
          <ChevronLeft /> Volver
        </button>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-8"
      >
        <div className="text-6xl">🎉</div>
        <h1 className="text-3xl font-bold">
          ¡Has completado las pelis de{' '}
          <span className="text-purple-600">{genre}</span>!
        </h1>
        <button
          onClick={() => navigate('/')}
          className="bg-purple-600 text-white py-4 px-8 rounded-lg font-bold hover:bg-purple-700 transition-colors"
        >
          Escoger género
        </button>
      </motion.div>
    </div>
  );
}