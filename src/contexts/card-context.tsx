'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

interface CardContextType {
  currentCard: number
  handleSetNextCard: (totalCards: number) => void
  isFlipped?: boolean
  handleToggleIsFlipped?: () => void
  isFinishedDeck: boolean
}

const CardContext = createContext({} as CardContextType)

export default function CardProvider({ children }: { children: ReactNode }) {
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isFinishedDeck, setIsFinishedDeck] = useState(false)

  function handleSetNextCard(totalCards: number) {
    setCurrentCard((currentCard + 1) % totalCards)
    setIsFlipped(false)
    if (currentCard + 1 === totalCards) {
      setIsFinishedDeck(true)
    }
  }

  function handleToggleIsFlipped() {
    setIsFlipped(!isFlipped)
  }

  return (
    <CardContext.Provider
      value={{
        currentCard,
        handleSetNextCard,
        isFlipped,
        handleToggleIsFlipped,
        isFinishedDeck,
      }}
    >
      {children}
    </CardContext.Provider>
  )
}

export const useCard = () => useContext(CardContext)
