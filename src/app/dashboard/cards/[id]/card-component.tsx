'use client'

import { SM2Algorithm } from '@/src/app/lib/sm2-algorithm'
import { Button } from '@/src/components/button'
import { CardContent } from '@/src/components/card'
import { useCard } from '@/src/contexts/card-context'
import { handleUpdateReview } from './update-review'

interface ICard {
  id: string
  deck_id: string
  front_text: string
  back_text: string
}

interface IReview {
  id: string
  user_id: string
  card_id: string
  ease: number
  interval: number
  review_date: Date | null
  next_review_date: Date | null
}

interface CardComponentProps {
  flashcards: {
    cards: ICard
    reviews: IReview
  }[]
}

type ReviewMethod = 'hard' | 'good' | 'easy'

export function CardComponent({ flashcards }: CardComponentProps) {
  const {
    isFlipped,
    isFinishedDeck,
    currentCard,
    handleSetNextCard,
    handleToggleIsFlipped,
  } = useCard()

  const handleNextCard = () => {
    handleSetNextCard(flashcards.length)
  }

  function handlePressDifficult(reviewMethod: ReviewMethod) {
    const { id, ease, interval } = flashcards[currentCard]?.reviews

    const sm2 = new SM2Algorithm({ ease, interval })
    sm2[reviewMethod]()
    handleUpdateReview({
      id: id,
      ease: sm2.getEaseFactor(),
      interval: sm2.getInterval(),
      next_review_date: sm2.nextReviewDate,
    })
    handleNextCard()
  }

  if (isFinishedDeck) {
    return (
      <div className="flex flex-col items-center mt-4">
        <h1 className="text-blue-100 text-2xl">Parabéns!</h1>
        <p className="text-blue-100 text-xl">Você terminou o deck!</p>
      </div>
    )
  }

  return (
    <>
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
          content={flashcards[currentCard]?.cards.front_text}
          style={{ backfaceVisibility: 'hidden', fontSize: '1rem' }}
        />
        <CardContent
          content={flashcards[currentCard]?.cards.back_text}
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            fontSize: '1rem',
          }}
        />
      </div>
      <div className="p-2 flex">
        <Button
          color="red"
          text="Errei"
          onClick={() => handlePressDifficult('hard')}
          disabled={!isFlipped}
        />
        <Button
          color="blue"
          text="Fácil"
          onClick={() => handlePressDifficult('good')}
          disabled={!isFlipped}
        />
        <Button
          color="green"
          text="Muito Fácil"
          onClick={() => handlePressDifficult('easy')}
          disabled={!isFlipped}
        />
      </div>
    </>
  )
}
