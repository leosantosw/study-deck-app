'use client'

import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react'

export function GoBackButton() {
  return (
    <Link href="/dashboard/">
      <div className="absolute bg-blue-900 border-blue-700 border-[1px] top-4 left-4 md:left-8 flex items-center justify-between p-2 rounded-lg">
        <ArrowLeft className="w-8 h-8 text-blue-200" size={100} />
      </div>
    </Link>
  )
}
