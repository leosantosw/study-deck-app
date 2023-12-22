'use client'

import { toast } from 'react-toastify'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { handleCreateDeck } from './create-deck'
import { PlusCircle } from '@phosphor-icons/react'
import { GoBackButton } from '@/src/components/goback-button'
import { useRouter } from 'next/navigation'
import { ClipLoader } from 'react-spinners'

const notifications = {
  fillAllFields: () =>
    toast.error('Preencha todos os campos!', {
      position: toast.POSITION.TOP_RIGHT,
    }),
  fillOneCard: () =>
    toast.error('Adicione pelo menos um card!', {
      position: toast.POSITION.TOP_RIGHT,
    }),
  successOnCreateDeck: () =>
    toast.success('Lista criada com sucesso!', {
      position: toast.POSITION.TOP_RIGHT,
    }),
  errorOnCreateDeck: () =>
    toast.error('Erro ao criar lista!', {
      position: toast.POSITION.TOP_RIGHT,
    }),
}

export default function Page() {
  const router = useRouter()
  const [cards, setCards] = useState([{ front_text: '', back_text: '' }])
  const [isLoading, setIsLoading] = useState(false)

  const addCard = () => {
    setCards((prevCards) => [...prevCards, { front_text: '', back_text: '' }])
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number,
    field: string
  ) => {
    const { value } = e.target

    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index] = {
        ...updatedCards[index],
        [field]: String(value),
      }
      return updatedCards
    })
  }

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)

      const deckName = String(formData.get('name'))
      const description = String(formData.get('description'))

      if (!deckName || !description) {
        return notifications.fillAllFields()
      }

      if (cards[0].front_text === '' || cards[0].back_text === '') {
        return notifications.fillOneCard()
      }

      setIsLoading(true)

      const result = await handleCreateDeck({
        name: deckName,
        description,
        cards,
      })

      setIsLoading(false)

      if (!result) {
        return notifications.errorOnCreateDeck()
      }

      notifications.successOnCreateDeck()
      router.push('/dashboard/')
    },
    [cards]
  )

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 font-primary mt-16 sm:mt-8">
      <GoBackButton />
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
        Criar nova lista
      </h2>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 gap-4 gap-x-4 w-full max-w-4xl sm:grid-cols-2 px-4"
      >
        <label className="block text-sm font-bold text-gray-900">
          Nome da lista
          <input
            id="name"
            name="name"
            type="text"
            className="appearance-none rounded-md relative block w-full px-3 py-3 mt-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          />
        </label>

        <label className="block text-sm font-bold text-gray-700">
          Descrição
          <textarea
            id="description"
            name="description"
            className="sm:h-[46px] appearance-none rounded-md relative block w-full px-3 py-3 mt-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          />
        </label>

        <div className="sm:col-span-2 bg-slate-200 p-6 rounded-lg">
          <h3 className="text-sm font-bold text-gray-900">Adicione os cards</h3>
          {cards.map((card, index) => (
            <div key={index} className="mt-4">
              <h4 className="text-sm font-bold text-gray-600">#{index + 1}</h4>
              <textarea
                placeholder="Frente do card"
                value={card.front_text}
                onChange={(e) => handleInputChange(e, index, 'front_text')}
                className="appearance-none rounded-md relative block w-full px-3 py-3 mt-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
              <textarea
                placeholder="Verso do card"
                value={card.back_text}
                onChange={(e) => handleInputChange(e, index, 'back_text')}
                className="appearance-none rounded-md relative block w-full px-3 py-3 mt-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
          ))}
          <button
            type="button"
            className="mt-2 text-blue-900 flex items-center gap-2 text-sm font-bold"
            onClick={addCard}
          >
            <PlusCircle size={28} /> Adicionar card
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`${
            isLoading ? 'bg-blue-700 cursor-not-allowed' : 'cursor-pointer'
          } w-full group relative flex justify-center py-3 px-4 border border-transparent font-bold text-lg rounded-md text-blue-50 bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          <ClipLoader
            color="#fff"
            loading={isLoading}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="mr-2 mt-[2px]"
          />
          {!isLoading && 'CRIAR'}
        </button>
      </form>
    </div>
  )
}
