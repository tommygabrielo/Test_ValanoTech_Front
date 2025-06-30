import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { fetchAvisDistribution } from '../service/avisService';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface DistributionItem {
  note: number;
  count: number;
}

interface Props {
  refreshTrigger: number;
}

const AvisDistributionChart: React.FC<Props> = ({ refreshTrigger }) => {
 const [distribution, setDistribution] = useState<DistributionItem[]>([]);

  useEffect(() => {
    const loadDistribution = async () => {
      const data = await fetchAvisDistribution();
      setDistribution(data);
    };

    loadDistribution();
  }, [refreshTrigger]); 

  const data = {
    labels: distribution.map((item) => `${item.note} Étoile(s)`),
    datasets: [
      {
        label: 'Nombre de produits',
        data: distribution.map((item) => item.count),
        backgroundColor: 'rgba(207, 19, 19, 0.5)',
        borderColor: 'crimson',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: 'Distribution des Avis par Note',
        color: 'white',
      },
    },
    scales: {
      x: {
        ticks: { color: 'white' },
      },
      y: {
        ticks: { color: 'white' },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2 style={{ color: 'white', textAlign: 'center' }}>Distribution des Avis</h2>
      <p style={{ color: 'white', textAlign: 'center' }}>
        Ce graphique montre la distribution des avis par note pour les produits.
      </p>
      <div
        style={{
          width: '400px',
          height: '300px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '8px',
          padding: '10px',
          margin: '20px auto',
        }}
      >
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AvisDistributionChart;
