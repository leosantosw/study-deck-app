'use client'

import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react'

interface HeaderProps {
  totalCards: number
}

export function Header({ totalCards }: HeaderProps) {
  const currentCard = 1
  return (
    <header>
      <Link href="/dashboard/">
        <div className="absolute bg-blue-900 border-blue-700 border-[1px] top-4 left-4 md:left-8 flex items-center justify-between p-2 rounded-lg">
          <ArrowLeft className="w-8 h-8 text-blue-200" size={100} />
        </div>
      </Link>
      <div className="flex flex-col items-center justify-center h-40 md:h-36">
        <h1 className="text-blue-100 text-2xl">Inglês Iniciante</h1>
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
