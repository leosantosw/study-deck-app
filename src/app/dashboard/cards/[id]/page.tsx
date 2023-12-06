import { db } from '@/src/db'
import { eq } from 'drizzle-orm'
import { cardsSchema } from '@/src/db/schema'
import { Header } from './header'
import CardComponent from './card-component'
import { Button } from '../../../../components/button'

interface CardParams {
  params: {
    id: string
  }
}

export default async function Cards({ params: { id } }: CardParams) {
  const cards = await db
    .select()
    .from(cardsSchema)
    .where(eq(cardsSchema.deck_id, id))

  return (
    <div className="h-screen bg-blue-900 font-primary">
      <Header totalCards={cards.length} />

      <div className="flex flex-col items-center justify-center">
        <CardComponent cards={cards} />
        <div className="p-2">
          <Button color="red" text="Again" />
          <Button color="blue" text="Good" />
          <Button color="green" text="Easy" />
        </div>
      </div>
    </div>
  )
}
