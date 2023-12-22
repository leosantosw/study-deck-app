import { db } from '@/src/db'
import { eq } from 'drizzle-orm'
import { decksSchema } from '@/src/db/schema'
import { BoxItem } from '@/src/components/box-item'
import Link from 'next/link'
import { cookies } from 'next/headers'
import NavSection from './nav-seaction'

export default async function Dashboad() {
  const userId = cookies().get('user_id')?.value || null
  const fullName = cookies().get('full_name')?.value || null

  const decks = await db
    .select()
    .from(decksSchema)
    .where(eq(decksSchema.user_id, String(userId)))

  return (
    <div>
      <header className="relative flex justify-between bg-blue-900 items-center py-4 px-8 md:px-16">
        <h1 className="text-blue-100 font-bold text-xl font-primary">
          Study deck
        </h1>
        <NavSection fullName={fullName} />
        <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
      </header>

      <main className="p-5 md:px-16 h-screen">
        <div className="flex justify-between">
          <h2 className="mt-auto text-base align-text-bottom font-bold text-gray-800 pb-3 font-primary">
            {decks.length > 0 ? 'Listas' : 'Nenhuma lista ainda.'}
          </h2>
          <Link href="/dashboard/decks">
            <button className="bg-blue-900 text-blue-100 font-bold py-2 px-4 rounded-md h-10 mb-6">
              Criar lista
            </button>
          </Link>
        </div>

        {decks.length === 0 ? (
          <div>
            <p className="text-gray-500">
              Crie uma lista para começar a estudar.
            </p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {decks.map((deck) => (
                <BoxItem
                  key={deck.id}
                  title={deck.name}
                  description={deck.description}
                  href={`dashboard/cards/${deck.id}`}
                  label={`${deck.total_cards} cards`}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
