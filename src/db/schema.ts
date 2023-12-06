import { pgTable, serial, text } from 'drizzle-orm/pg-core'

export const decksSchema = pgTable('decks', {
  id: text('id').primaryKey(),
  user_id: text('id').notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  total_cards: text('total_cards').notNull(),
})

export const cardsSchema = pgTable('cards', {
  id: text('id').primaryKey(),
  deck_id: text('deck_id').notNull(),
  front_text: text('front_text').notNull(),
  back_text: text('back_text').notNull(),
})
