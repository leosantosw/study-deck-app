'use server'

import { db } from '@/src/db'
import { reviewsSchema } from '@/src/db/schema'
import { eq } from 'drizzle-orm'

interface IUpdateReview {
  id: string
  interval: number
  ease: number
  next_review_date: string
}

export async function handleUpdateReview({
  id,
  interval,
  ease,
  next_review_date,
}: IUpdateReview) {
  console.log('handleUpdateReview', id, interval, ease, next_review_date)

  await db
    .update(reviewsSchema)
    .set({
      ease,
      interval,
      next_review_date,
      review_date: new Date().toDateString(),
    })
    .where(eq(reviewsSchema.id, id))
}
