'use client'

import Avatar from 'react-avatar'
import { destroyCookie } from 'nookies'
import { useRouter } from 'next/navigation'

interface NavSectionProps {
  fullName: string | null
}

export default function NavSection({ fullName }: NavSectionProps) {
  const router = useRouter()

  function handleSignOut() {
    destroyCookie(null, 'access_token')
    router.push('/sign-in')
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleSignOut}
        className="bg-blue-900 text-blue-100 font-bold py-2 px-4 rounded-md h-10"
      >
        Sair
      </button>
      <Avatar round size="50" name={fullName || ''} />
    </div>
  )
}
