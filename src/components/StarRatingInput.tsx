import React, { useState } from 'react';

interface StarRatingInputProps {
  onRate: (rating: number) => void;
}

const StarRatingInput = ({ onRate }: StarRatingInputProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelected(index);
    onRate(index);
  };

  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            style={{
              cursor: 'pointer',
              color: (hovered || selected) && starValue <= (hovered ?? selected!) ? 'gold' : 'gray',
              fontSize: '20px',
            }}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(null)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRatingInput;
