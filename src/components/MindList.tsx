import React, { useContext, useEffect, useState, useCallback } from 'react';
import { AvisContext } from '../context/AvisContext';
import '../assets/MindList.css';

interface Avis {
  id: number;
  note: number;
  commentaire: string;
  date_avis: string;
}

interface Props {
  produitId: number;
  refreshTrigger: number;
}

const MindList: React.FC<Props> = ({ produitId, refreshTrigger  }) => {
  const { getAvis } = useContext(AvisContext);

  const [avis, setAvis] = useState<Avis[]>([]);
  const [sort, setSort] = useState<string>('date');
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAvis = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAvis(produitId, sort, search);
      setAvis(data);
    } catch (error) {
      console.error('Erreur lors du chargement des avis', error);
    } finally {
      setLoading(false);
    }
  }, [getAvis, produitId, sort, search]);

  useEffect(() => {
    fetchAvis();
  }, [fetchAvis, refreshTrigger]);

  const renderStars = (note: number) => {
    const totalStars = 5;
    return (
      <div className="star-display">
        {[...Array(totalStars)].map((_, index) => (
          <span key={index} className={index < note ? 'filled' : 'empty'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="mind-list-container">
      <h4>Avis clients :</h4>

      <div className="filter-container">
        <label>Filtrer par :</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="date">Date</option>
          <option value="note">Note</option>
        </select>

        <input
          className="search-input"
          type="text"
          placeholder="Rechercher un mot-clé..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Chargement des avis...</p>
      ) : avis.length === 0 ? (
        <p>Aucun avis trouvé.</p>
      ) : (
        <ul className="avis-list">
          {avis.map((a, index) => (
            <React.Fragment key={a.id}>
              <div className="avis-item">
                <div className="avis-container">
                  <p className="date">{new Date(a.date_avis).toLocaleDateString()}</p>
                  {renderStars(a.note)}
                </div>
                <p className="commentaire">{a.commentaire}</p>
              </div>
              {index !== avis.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MindList;
