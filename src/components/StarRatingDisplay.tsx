import React from 'react';

interface StarRatingDisplayProps {
  average: number;
}

const StarRatingDisplay = ({ average }: StarRatingDisplayProps) => {
  const fullStars = Math.floor(average);
  const hasHalfStar = average - fullStars >= 0.5;
  const totalStars = 5;

  return (
    <div>
      {Array.from({ length: totalStars }).map((_, index) => {
        if (index < fullStars) return <span key={index}>⭐</span>;
        else if (index === fullStars && hasHalfStar) return <span key={index}>⭐½</span>;
        else return <span key={index}>☆</span>;
      })}
      <span style={{ marginLeft: '8px', color: 'gray' }}>({average.toFixed(1)}/5)</span>
    </div>
  );
};

export default StarRatingDisplay;
