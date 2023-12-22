'use client'

import { useCard } from '@/src/contexts/card-context'
import { GoBackButton } from '@/src/components/goback-button'
import Confetti from 'react-dom-confetti'
import { useEffect, useState } from 'react'

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 60,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 4000,
  stagger: 3,
  width: '10px',
  height: '10px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
}

interface HeaderProps {
  totalCards: number
  title: string
}

export function Header({ totalCards, title }: HeaderProps) {
  const { currentCard, isFinishedDeck } = useCard()
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isFinishedDeck) {
      setShowConfetti(true)
    }
  }, [isFinishedDeck])

  return (
    <header className="pt-12 md:pt-6 overflow-hidden">
      <GoBackButton />
      <div className="flex flex-col items-center justify-center h-32 md:h-36">
        <h1 className="text-blue-100 text-2xl">{title}</h1>
        <Confetti key={currentCard} active={showConfetti} config={config} />
        <div className="flex items-center mt-4">
          <div className="w-72 md:w-88 h-3 bg-blue-600 rounded-full">
            <div
              className="h-full bg-blue-200 rounded-full"
              style={{
                width: `${((currentCard + 1) / totalCards) * 100}%`,
              }}
            ></div>
          </div>
          <p className="text-center ml-2 text-blue-100 font-bold text-lg md:text-xl">
            {currentCard + 1} / {totalCards}
          </p>
        </div>
      </div>
    </header>
  )
}
