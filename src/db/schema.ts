import { pgTable, serial, text } from 'drizzle-orm/pg-core'

export const decksSchema = pgTable('decks', {
  id: serial('id').primaryKey(),
  user_id: serial('id'),
  name: text('name').notNull(),
  description: text('description').notNull(),
  total_cards: text('total_cards').notNull(),
})

export const cardsSchema = pgTable('cards', {
  id: serial('id').primaryKey(),
  deck_id: text('deck_id'),
  front_text: text('front_text').notNull(),
  back_text: text('back_text').notNull(),
})
