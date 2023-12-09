import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'StudyDeck',
}

// export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
