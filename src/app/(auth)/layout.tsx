import { ReactNode } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

export const dynamic = 'force-dynamic'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  )
}
