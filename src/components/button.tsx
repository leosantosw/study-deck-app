import { CheckCircle } from '@phosphor-icons/react'

interface ButtonProps {
  color: 'red' | 'blue' | 'green'
  text: string
  disabled?: boolean
  onClick?: () => void
}

export function Button({ color, text, disabled, onClick }: ButtonProps) {
  const colorVariants = {
    red: 'bg-red-400 hover:bg-red-500',
    blue: 'bg-blue-400 hover:bg-blue-500',
    green: 'bg-green-400 hover:bg-green-500',
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
      ${colorVariants[color]} ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      } text-blue-50 transition-colors text-base font-bold rounded-lg h-12 m-1 px-[1px] w-[120px] md:w-[130px] flex justify-center items-center`}
    >
      <CheckCircle size={28} className="mr-[2px]" />
      {text}
    </button>
  )
}
