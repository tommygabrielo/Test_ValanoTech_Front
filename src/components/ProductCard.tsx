import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../context/ProductContext';
import StarRatingDisplay from './StarRatingDisplay';
import AddMind from './AddMind';
import MindList from './MindList';
import { fetchMoyenneAvisByProduit } from '../service/avisService';
import '../assets/ProductCard.css';

Modal.setAppElement('#root');

interface Props {
  product: Product;
  onAvisAdded: () => void;
}

const ProductCard: React.FC<Props> = ({ product, onAvisAdded }) => {
  const [average, setAverage] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const handleLocalRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
    onAvisAdded();
  };

  useEffect(() => {
    const loadAverage = async () => {
      const moyenne = await fetchMoyenneAvisByProduit(product.id);
      setAverage(moyenne);
    };
    loadAverage();
  }, [product.id, refreshTrigger]);

  return (
    <>
      <motion.div
        className="product-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <img src={product.image_url} alt={product.titre} className="product-image" />
        <h3>{product.titre}</h3>
        {average !== null ? (
          <StarRatingDisplay average={average} />
        ) : (
          <p>Pas encore de note</p>
        )}
        <p>{product.description}</p>
        <p><strong>{product.prix} €</strong></p>
        <div className='button-wrapper'>
          <button className='open-modal-button' onClick={() => setShowModal(true)}>Voir les avis clients</button>
        </div>
      </motion.div>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="custom-modal"
        overlayClassName="custom-overlay"
        closeTimeoutMS={300}
      >
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className='background-modal'>
                <button onClick={() => setShowModal(false)} className="close-button">X</button>
                <AddMind produitId={product.id} onAvisAdded={handleLocalRefresh} />
                <hr />
                <MindList produitId={product.id} refreshTrigger={refreshTrigger} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </>
  );
};

export default ProductCard;
