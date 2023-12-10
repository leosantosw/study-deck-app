'use client'

import React, { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    // Handle login logic here
  }

  return (
    <div className="font-primary min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8 sm:flex sm:items-center sm:justify-between">
        <div className="sm:w-2/5">
          <h2 className="mt-6 text-center sm:text-left sm:text-5xl text-3xl sm:leading-[70px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-900">
            Faça seu login na plataforma
          </h2>
        </div>
        <form className="mt-8 space-y-6 sm:w-2/5" onSubmit={handleSubmit}>
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
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent font-bold text-xl rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
