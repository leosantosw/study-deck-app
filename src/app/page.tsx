'use client'
import { useState } from "react";

function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped)
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
            Front
          </div>
          <div 
            className="absolute w-full h-full rounded-lg grid place-content-center"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden"
            }}
          >
            Back
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;