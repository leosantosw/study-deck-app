import { pgTable, real, text, date } from 'drizzle-orm/pg-core'

export const usersSchema = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  username: text('username').notNull(),
  password_hash: text('password_hash').notNull(),
})

export const decksSchema = pgTable('decks', {
  id: text('id').primaryKey(),
  user_id: text('id')
    .notNull()
    .references(() => usersSchema.id),
  name: text('name').notNull(),
  description: text('description').notNull(),
  total_cards: text('total_cards').notNull(),
})

export const cardsSchema = pgTable('cards', {
  id: text('id').primaryKey(),
  deck_id: text('deck_id')
    .notNull()
    .references(() => decksSchema.id),
  front_text: text('front_text').notNull(),
  back_text: text('back_text').notNull(),
})

export const reviewsSchema = pgTable('reviews', {
  id: text('id').primaryKey(),
  user_id: text('user_id')
    .notNull()
    .references(() => usersSchema.id),
  card_id: text('card_id')
    .notNull()
    .references(() => cardsSchema.id),
  ease: real('ease').notNull(),
  interval: real('interval').notNull(),
  review_date: date('review_date').notNull(),
  next_review_date: date('next_review_date').notNull(),
})
