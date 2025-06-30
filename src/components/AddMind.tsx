import React, { useState } from 'react';
import { addAvis } from '../service/avisService';
import '../assets/AddMind.css';

interface Props {
  produitId: number;
  onAvisAdded: () => void;
}

const AddMind: React.FC<Props> = ({ produitId, onAvisAdded }) => {
  const [note, setNote] = useState<number>(5);
  const [hover, setHover] = useState<number | null>(null);
  const [commentaire, setCommentaire] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addAvis(note, commentaire, 1, produitId);
      alert('Avis ajouté avec succès !');
      setCommentaire('');
      setNote(5);
      onAvisAdded();
    } catch (err) {
      console.error('Erreur ajout avis', err);
      setError('Erreur lors de l\'envoi de l\'avis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-mind-form">
      <div className="rating-container">
        <h4>Ajouter un avis</h4>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${(hover ?? note) >= star ? 'active' : ''}`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setNote(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <textarea
        value={commentaire}
        onChange={(e) => setCommentaire(e.target.value)}
        placeholder="Votre commentaire..."
        required
      />
      {error && <p className="error-message">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Envoi...' : 'Envoyer'}
      </button>
    </form>
  );
};

export default AddMind;
