'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

interface CardContextType {
  currentCard: number
  handleSetNextCard: (totalCards: number) => void
  isFlipped?: boolean
  handleToggleIsFlipped?: () => void
}

const CardContext = createContext({} as CardContextType)

export default function CardProvider({ children }: { children: ReactNode }) {
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  function handleSetNextCard(totalCards: number) {
    setCurrentCard((currentCard + 1) % totalCards)
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
      }}
    >
      {children}
    </CardContext.Provider>
  )
}

export const useCard = () => useContext(CardContext)
