import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';
import AvisDistributionChart from '../components/AvisDistributionChart';

const Home = () => {
  const [refreshDistributionTrigger, setRefreshDistributionTrigger] = useState<number>(0);

  const handleRefreshDistribution = () => {
    setRefreshDistributionTrigger((prev) => prev + 1);
  };

  return (
    <div>
      <Navbar />
      <ProductList onAvisAdded={handleRefreshDistribution} />
      <AvisDistributionChart refreshTrigger={refreshDistributionTrigger} />
    </div>
  );
};

export default Home;
