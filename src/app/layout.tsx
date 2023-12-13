import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'

export const metadata: Metadata = {
  title: 'StudyDeck',
}

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ToastContainer />
        {children}
      </body>
    </html>
  )
}
