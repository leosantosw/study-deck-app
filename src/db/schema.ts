import { pgTable, real, text, integer, date } from 'drizzle-orm/pg-core'

export const usersSchema = pgTable('users', {
  id: text('id'),
  name: text('name').notNull(),
  username: text('username').notNull(),
  password_hash: text('password_hash').notNull(),
})

export const decksSchema = pgTable('decks', {
  id: text('id'),
  user_id: text('user_id')
    .notNull()
    .references(() => usersSchema.id),
  name: text('name').notNull(),
  description: text('description').notNull(),
  total_cards: integer('total_cards').notNull(),
})

export const cardsSchema = pgTable('cards', {
  id: text('id'),
  deck_id: text('deck_id')
    .notNull()
    .references(() => decksSchema.id),
  front_text: text('front_text').notNull(),
  back_text: text('back_text').notNull(),
})

export const reviewsSchema = pgTable('reviews', {
  id: text('id'),
  user_id: text('user_id')
    .notNull()
    .references(() => usersSchema.id),
  card_id: text('card_id')
    .notNull()
    .references(() => cardsSchema.id),
  ease: real('ease').notNull(),
  interval: real('interval').notNull(),
  review_date: date('review_date', { mode: 'date' }),
  next_review_date: date('next_review_date', { mode: 'date' }),
})
