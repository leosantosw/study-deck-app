import { db } from '@/src/db'
import { and, eq, isNull, lte, or } from 'drizzle-orm'
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
    .innerJoin(reviewsSchema, eq(reviewsSchema.card_id, cardsSchema.id))
    .where(
      and(
        eq(cardsSchema.deck_id, id),
        or(
          isNull(reviewsSchema.review_date),
          lte(reviewsSchema.next_review_date, new Date())
        )
      )
    )

  console.log(cardsAndReview)

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
