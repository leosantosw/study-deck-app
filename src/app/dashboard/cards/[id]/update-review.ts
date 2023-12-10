'use server'

import { db } from '@/src/db'
import { eq } from 'drizzle-orm'
import { reviewsSchema } from '@/src/db/schema'

interface IUpdateReview {
  id: string
  interval: number
  ease: number
  next_review_date: Date | null
}

export async function handleUpdateReview({
  id,
  interval,
  ease,
  next_review_date,
}: IUpdateReview) {
  await db
    .update(reviewsSchema)
    .set({
      ease,
      interval,
      next_review_date,
      review_date: new Date(),
    })
    .where(eq(reviewsSchema.id, id))
}
