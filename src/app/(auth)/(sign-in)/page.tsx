'use client'

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { loginUser } from './login-user'
import { useRouter } from 'next/navigation'
import { ClipLoader } from 'react-spinners'

const notifications = {
  loginSuccessful: () =>
    toast.success('Login realizado com sucesso!', {
      position: toast.POSITION.TOP_RIGHT,
    }),
  wrongCredentials: () =>
    toast.error('Ops, parece que você errou o username ou a senha!', {
      position: toast.POSITION.TOP_RIGHT,
    }),
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(data: FormData) {
    const username = String(data.get('username'))
    const password = String(data.get('password'))

    if (!username || !password) {
      return
    }

    const { status } = await loginUser({ username, password })

    setIsLoading(false)

    if (status === 401) {
      notifications.wrongCredentials()
      setIsLoading(false)
    } else if (status === 201) {
      notifications.loginSuccessful()
      router.push('/dashboard')
    }
  }

  return (
    <div className="font-primary min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8 sm:flex sm:items-center sm:justify-between">
        <div className="sm:w-2/5">
          <h2 className="mt-6 text-center sm:text-left sm:text-5xl text-3xl sm:leading-[70px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-900">
            Faça seu login na plataforma
          </h2>
        </div>
        <form action={handleSubmit} className="mt-8 space-y-6 sm:w-2/5">
          <input
            id="username"
            name="username"
            type="username"
            autoComplete="username"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="w-full mx-auto">
            <button
              type="submit"
              onClick={() => setIsLoading(true)}
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
              {!isLoading && 'ENTRAR'}
            </button>
          </div>
          <div className="text-base text-center mt-4 flex space-x-2 justify-center">
            <p className="text-gray-600">Não tem uma conta?</p>
            <a
              href="/sign-up"
              className="text-blue-500 font-semibold hover:text-blue-700 no-underline"
            >
              Registre-se
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
