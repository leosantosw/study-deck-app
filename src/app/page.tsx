"use client";
import { useState } from "react"
import { CardContent } from "../components/card"
import Button from "../components/button"

const content = [
  {
    front: "Front of card 1",
    back: "Back of card 1",
  },
  {
    front: "Front of card 2",
    back: "Back of card 2",
  },
  {
    front: "Front of card 3",
    back: "Back of card 3",
  },
  {
    front: "Front of card 4",
    back: "Back of card 4",
  },
  {
    front: "Front of card 5",
    back: "Back of card 5",
  },
]

function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNextCard = () => {
    setCurrentCard((currentCard + 1) % content.length)
    setIsFlipped(false)
  }

  return (
    <div className="h-screen">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-gray-900">StudyDeck</h1>
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div
          className="w-72 h-72 rounded-lg cursor-pointer grid place-content-center relative bg-slate-50"
          onClick={handleCardFlip}
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.6s",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <CardContent
            content={content[currentCard].front}
            style={{ backfaceVisibility: "hidden" }}
          />
          <CardContent
            content={content[currentCard].back}
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
            onClick={handleNextCard}
          />
        </div>
        <div className="p-2">
          <Button color="yellow" hoverColor="red" text="Again" />
          <Button color="blue" hoverColor="blue" text="Good" />
          <Button
            color="green"
            hoverColor="green"
            text="Easy"
            onClick={handleNextCard}
          />
        </div>
      </div>
    </div>
  )
}

export default FlipCard
