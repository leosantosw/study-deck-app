'use client'

import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react'
import { useCard } from '@/src/contexts/card-context'

interface HeaderProps {
  totalCards: number
  title: string
}

export function Header({ totalCards, title }: HeaderProps) {
  const { currentCard } = useCard()
  return (
    <header className="pt-12 md:pt-6">
      <Link href="/dashboard/">
        <div className="absolute bg-blue-900 border-blue-700 border-[1px] top-4 left-4 md:left-8 flex items-center justify-between p-2 rounded-lg">
          <ArrowLeft className="w-8 h-8 text-blue-200" size={100} />
        </div>
      </Link>
      <div className="flex flex-col items-center justify-center h-32 md:h-36">
        <h1 className="text-blue-100 text-2xl">{title}</h1>
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