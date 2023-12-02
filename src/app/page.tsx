'use client'
import { useState } from "react";

const content = [
  {
    "front": "Front of card 1",
    "back": "Back of card 1"
  },
  {
    "front": "Front of card 2",
    "back": "Back of card 2"
  },
  {
    "front": "Front of card 3",
    "back": "Back of card 3"
  },
  {
    "front": "Front of card 4",
    "back": "Back of card 4"
  },
  {
    "front": "Front of card 5",
    "back": "Back of card 5"
  }
];

function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  }

  const handleNextCard = () => {
    setCurrentCard((currentCard + 1) % content.length);
    setIsFlipped(false);
  }

  return (
    <div className="h-screen">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-gray-900">StudyDeck</h1>
      </div>
      <div className="flex items-center justify-center h-full">
        <div 
          className="w-72 h-72 rounded-lg cursor-pointer grid place-content-center relative bg-slate-50"
          onClick={handleClick}
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.6s",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
          }}
        >
          <div 
            className="absolute w-full h-full rounded-lg grid place-content-center"
            style={{
              backfaceVisibility: "hidden"
            }}
          >
            {content[currentCard].front} 
          </div>
          <div 
            className="absolute w-full h-full rounded-lg grid place-content-center"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden"
            }}
            onClick={handleNextCard}
          >
            {content[currentCard].back}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;