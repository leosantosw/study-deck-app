'use client'

import { FormEvent, useState } from 'react'
import { ArrowLeft } from '@phosphor-icons/react'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useRouter } from 'next/navigation'
import { createUser } from './create-user'

const notifications = {
  accountCreated: () =>
    toast.success('Conta criada com sucesso!', {
      position: toast.POSITION.TOP_RIGHT,
    }),
  usernameAlreadyTaken: () =>
    toast.warning('Ops, alguém já pegou esse username. Tente outro!', {
      position: toast.POSITION.TOP_RIGHT,
    }),
}

export default function SignUp() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name'))
    const username = String(formData.get('username'))
    const password = String(formData.get('password'))

    if (!name || !username || !password) {
      return
    }

    setIsLoading(true)

    const { status } = await createUser({ name, username, password })

    setIsLoading(false)

    if (status === 409) {
      notifications.usernameAlreadyTaken()
      setIsLoading(false)
    } else if (status === 201) {
      notifications.accountCreated()
      router.push('/')
    }
  }

  return (
    <div className="font-primary min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <h2 className="mt-6 text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-900">
        Crie sua conta
      </h2>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 w-full sm:max-w-md">
        <input
          id="name"
          name="name"
          type="text"
          required
          className="appearance-none rounded-md relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Nome"
        />
        <input
          id="username"
          name="username"
          type="text"
          required
          className="appearance-none rounded-md relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Username"
        />
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="appearance-none rounded-md relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Senha"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`${
            isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
          } w-full group relative flex justify-center py-3 px-4 border border-transparent font-bold text-lg rounded-md text-blue-50 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          <ClipLoader
            color="#fff"
            loading={isLoading}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="mr-2 mt-[2px]"
          />
          {!isLoading && 'CADASTRAR'}
        </button>
        <div className="text-base flex justify-center">
          <a
            href="/"
            className="text-blue-500 font-semibold hover:text-blue-700 no-underline flex items-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            Voltar para login
          </a>
        </div>
      </form>
    </div>
  )
}
