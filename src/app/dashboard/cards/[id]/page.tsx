import { db } from '@/src/db'
import { eq } from 'drizzle-orm'
import { Header } from './header'
import { CardComponent } from './card-component'
import { cardsSchema, decksSchema, reviewsSchema } from '@/src/db/schema'

interface CardParams {
  params: {
    id: string
  }
}

export default async function Cards({ params: { id } }: CardParams) {
  const cardsAndReview = await db
    .select()
    .from(cardsSchema)
    .where(eq(cardsSchema.deck_id, id))
    .innerJoin(reviewsSchema, eq(reviewsSchema.card_id, cardsSchema.id))

  const [{ title }] = await db
    .select({ title: decksSchema.name })
    .from(decksSchema)
    .where(eq(decksSchema.id, id))
    .limit(1)

  return (
    <div className="h-screen bg-blue-900 font-primary">
      <Header totalCards={cardsAndReview.length} title={title} />
      <div className="flex flex-col items-center justify-center">
        <CardComponent flashcards={cardsAndReview} />
      </div>
    </div>
  )
}
