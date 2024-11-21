export interface Movie {
  id: number;
  title: string;
  emojis: string[];
  genre: string;
}

export interface Genre {
  id: string;
  name: string;
  emoji: string;
  progress: number;
  total: number;
}

export interface GameState {
  currentGenre: string | null;
  currentMovieIndex: number;
  correctAnswers: { [key: string]: boolean };
}