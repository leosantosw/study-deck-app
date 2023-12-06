'use client'

import { CardContent } from '@/src/components/card'
import { useCard } from '@/src/contexts/card-context'

interface CardComponentProps {
  cards: { front_text: string; back_text: string }[]
}

export default function CardComponent({ cards }: CardComponentProps) {
  const { currentCard, isFlipped, handleSetNextCard, handleToggleIsFlipped } =
    useCard()

  const handleNextCard = () => {
    handleSetNextCard(cards.length)
  }

  return (
    <div
      className="w-82 h-100 md:w-100 md:h-72 rounded-lg cursor-pointer grid place-content-center relative bg-gray-50 text-gray-900"
      onClick={handleToggleIsFlipped}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}
    >
      <CardContent
        content={cards[currentCard]?.front_text}
        style={{ backfaceVisibility: 'hidden', fontSize: '1rem' }}
      />
      <CardContent
        content={cards[currentCard]?.back_text}
        style={{
          transform: 'rotateY(180deg)',
          backfaceVisibility: 'hidden',
          fontSize: '1rem',
        }}
        onClick={handleNextCard}
      />
    </div>
  )
}
