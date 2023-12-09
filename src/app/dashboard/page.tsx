import { BoxItem } from '@/src/components/box-item'
import { db } from '@/src/db'
import { decksSchema } from '@/src/db/schema'

export default async function Dashboad() {
  const decks = await db.select().from(decksSchema)

  return (
    <div>
      <header className="relative flex justify-between bg-blue-900 items-center py-4 px-8 md:px-16">
        <h1 className="text-blue-100 font-bold text-xl font-primary">
          Study deck
        </h1>
        <img
          src="https://github.com/leosantosw.png"
          className="w-16 h-16 rounded-full"
          alt="Profile"
        />
        <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
      </header>

      <main className="p-5 md:px-16">
        <h2 className="text-base font-bold text-gray-800 pb-3 font-primary">
          Listas
        </h2>
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
      </main>
    </div>
  )
}
