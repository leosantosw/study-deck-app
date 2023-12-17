'use server'

import { db } from '@/src/db'
import { cardsSchema, decksSchema } from '@/src/db/schema'

interface ICreateDeck {
  name: string
  description: string
  user_id: string
  total_cards: string
}

export async function handleCreateDeck({
  name,
  description,
  user_id,
  total_cards,
}: ICreateDeck) {
  const createdDeck = await db.insert(decksSchema).values({
    user_id: user_id,
    name: name,
    description: description,
    total_cards: total_cards,
  })

  console.log(createdDeck)

  // await db.insert(cardsSchema).values([{ deck_id: '', front_text: '', back_text:  }])
}
