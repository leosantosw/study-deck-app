'use server'

import { db } from '@/src/db'
import { cardsSchema, decksSchema, reviewsSchema } from '@/src/db/schema'
import { cookies } from 'next/headers'

interface ICards {
  front_text: string
  back_text: string
}

interface ICreateDeck {
  name: string
  description: string
  cards: ICards[]
}

export async function handleCreateDeck({
  name,
  description,
  cards,
}: ICreateDeck) {
  try {
    const userId = cookies().get('user_id')?.value || null
    const [{ deckId }] = await db
      .insert(decksSchema)
      .values({
        name,
        user_id: String(userId),
        description,
        total_cards: cards.length,
      })
      .returning({ deckId: decksSchema.id })

    const cardsIds = await db
      .insert(cardsSchema)
      .values(
        cards.map((card) => ({
          ...card,
          deck_id: String(deckId),
        }))
      )
      .returning({ cardId: cardsSchema.id })

    await db.insert(reviewsSchema).values(
      cardsIds.map(({ cardId }) => ({
        user_id: String(userId),
        card_id: String(cardId),
        ease: 2.5,
        interval: 10,
        review_date: new Date(),
        next_review_date: new Date(),
      }))
    )

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
