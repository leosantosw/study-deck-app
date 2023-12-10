import { db } from '@/src/db'
import { Header } from './header'
import { CardComponent } from './card-component'
import { GoBackButton } from '@/src/components/goback-button'
import { and, eq, isNull, lte, or } from 'drizzle-orm'
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

  // console.log(cardsAndReview)

  const [{ title }] = await db
    .select({ title: decksSchema.name })
    .from(decksSchema)
    .where(eq(decksSchema.id, id))
    .limit(1)

  if (!cardsAndReview.length) {
    return (
      <div className="h-screen font-primary flex items-center justify-center px-2 bg-blue-900">
        <GoBackButton />
        <div className="text-center p-10 rounded-lg shadow-lg bg-white">
          <h1 className="text-2xl text-gray-900 mb-5">
            Ops! Parece que não temos mais cards para revisar por agora. 😊
          </h1>
          <p className="text-xl text-gray-700">
            Volte mais tarde, teremos novos cards esperando por você!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-blue-900 font-primary">
      <Header totalCards={cardsAndReview.length} title={title} />
      <div className="flex flex-col items-center justify-center">
        <CardComponent flashcards={cardsAndReview} />
      </div>
    </div>
  )
}
