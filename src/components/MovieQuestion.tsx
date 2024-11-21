import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types';


interface MovieQuestionProps {
  movie: Movie;
  onCorrectAnswer: () => void;
  onPrevious: () => void;
  onNext: () => void;
  correctCount: number;
  totalQuestions: number;
  isAnswered: boolean;
}

export function MovieQuestion({
  movie,
  onCorrectAnswer,
  onPrevious,
  onNext,
  correctCount,
  totalQuestions,
  isAnswered,
}: MovieQuestionProps) {
  const [answer, setAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const navigate = useNavigate();

  const checkAnswer = () => {
    const normalizeText = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const isCorrect = normalizeText(answer.toLowerCase()) === normalizeText(movie.title.toLowerCase());
    setShowFeedback(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      onCorrectAnswer();
      setTimeout(() => {
        setShowFeedback(null);
        setAnswer('');
        onNext();
      }, 1500);
    } else {
      setTimeout(() => setShowFeedback(null), 1000);
    }
  };


  return (
    <div className="min-h-screen bg-purple-50 p-4">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-black"
        >
          <ChevronLeft /> Volver
        </button>
        <div className="text-black">
          Correctas {correctCount}/{totalQuestions}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-8 mt-12">
        ¿Qué peli de <span className="text-purple-600">{movie.genre}</span> es?
      </h2>

      <div className="flex justify-center items-center gap-8 mb-32 mt-32">
        <button onClick={onPrevious} className="text-purple-600">
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-4 text-6xl">
          {movie.emojis.map((emoji, index) => (
            <motion.span
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="font-[Apple Color Emoji, 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif]"
              >
              {emoji}
            </motion.span>
          ))}
        </div>
        <button onClick={onNext} className="text-purple-600">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="space-y-4 w-4/5 mx-auto">
        {/* Aquí utilizamos un div para mostrar el texto en verde si la respuesta es correcta */}
        {isAnswered ? (
          <div
            className="w-full p-4 border-b border-b-green-600 focus:border-purple-400 outline-none placeholder-black text-green-600 font-semibold"
          >
            {movie.title} ✓
          </div>
        ) : (
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Título de la peli..."
            className={`w-full p-4 border-b border-black focus:border-purple-400 outline-none placeholder-black ${isAnswered ? 'opacity-50' : ''}`}
            disabled={isAnswered}
          />
        )}

      <button
        onClick={() => {
          // Si la respuesta ya fue correcta, pasa a la siguiente pregunta
          if (isAnswered) {
            onNext(); // Ir a la siguiente pregunta
          } else {
            checkAnswer(); // Verificar la respuesta si aún no se ha respondido
          }
        }}
        className={`w-full ${isAnswered ? 'bg-green-600' : 'bg-purple-600'} text-white py-4 rounded-lg font-bold hover:${isAnswered ? 'bg-green-700' : 'bg-purple-700'} transition-colors ${isAnswered ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isAnswered ? 'Has acertado!' : 'He acertado?'}
      </button>



      </div>

      {showFeedback && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          // Condicional para cambiar el color de fondo
          className={`fixed inset-0 flex items-center justify-center bg-opacity-20 
            ${showFeedback === 'correct' ? 'bg-green-600' : 'bg-red-500'}`}
        >
          <div className="text-6xl">
            {showFeedback === 'correct' ? '🎉' : '❌'}
          </div>
        </motion.div>
      )}

    </div>
  );
}