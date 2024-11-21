import { useParams } from 'react-router-dom';
import { CompletedScreen } from '../components/CompletedScreen';
import { genres } from '../data/genres';

export function Completed() {
  const { genre } = useParams();
  const genreData = genres.find((g) => g.id === genre);

  if (!genreData) return null;

  return <CompletedScreen genre={genreData.name} />;
}