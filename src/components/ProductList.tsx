import React, { useContext, useRef, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from './ProductCard';
import '../assets/ProductList.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Props {
  onAvisAdded: () => void;
}

const ProductList: React.FC<Props> = ({ onAvisAdded }) => {
  const LeftIcon = FaChevronLeft as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const RightIcon = FaChevronRight as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const { products, loading } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const productsPerPage = 3;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="product-list-wrapper">
      <h2 style={{textAlign:"center"}}>Liste des produits</h2>

      <div className="scroll-buttons">
        <LeftIcon onClick={scrollLeft} />
        <RightIcon onClick={scrollRight} />
      </div>

      <div ref={containerRef} className="product-list">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAvisAdded={onAvisAdded} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Précédent
        </button>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ProductList;
