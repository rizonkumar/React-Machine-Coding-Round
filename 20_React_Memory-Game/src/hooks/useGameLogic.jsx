import { useEffect, useState } from "react";
import { generateGrid } from "../utils/generateGrid";

export const useGameLogic = () => {
  const [cards, setCards] = useState(generateGrid);
  const [isLock, setIsLock] = useState(false);
  const [flippedCard, setFlippedCard] = useState([]);

  const handleCardClick = (index) => {
    if (cards[index].isFlipped || isLock) return;

    const copyCards = [...cards];
    copyCards[index].isFlipped = true;
    setCards(copyCards);
    setFlippedCard([...flippedCard, index]);
  };

  useEffect(() => {
    if (flippedCard.length === 2) {
      setIsLock(true);
      setTimeout(() => {
        if (cards[flippedCard[0]].number !== cards[flippedCard[1]].number) {
          setCards((prevCards) => {
            const copyCards = [...prevCards];
            copyCards[flippedCard[0]].isFlipped = false;
            copyCards[flippedCard[1]].isFlipped = false;
            return copyCards;
          });
        }
        setIsLock(false);
        setFlippedCard([]);
      }, 3000);
    }
  }, [flippedCard, cards]);

  return { cards, handleCardClick };
};
