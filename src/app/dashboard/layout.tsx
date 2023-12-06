import { ReactNode } from 'react'
import CardProvider from '@/src/contexts/card-context'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <CardProvider>{children}</CardProvider>
}
