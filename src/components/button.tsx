import { CheckCircle } from '@phosphor-icons/react'

interface ButtonProps {
  color: 'red' | 'blue' | 'green'
  text: string
  disabled?: boolean
  onClick?: () => void
}

export function Button({ color, text, disabled, onClick }: ButtonProps) {
  const colorVariants = {
    red: 'bg-red-400 hover:bg-red-600',
    blue: 'bg-blue-400 hover:bg-blue-600',
    green: 'bg-green-400 hover:bg-green-600',
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${colorVariants[color]} text-blue-50 text-base font-bold rounded-lg h-12 m-1 px-[1px] w-[120px] md:w-[130px] flex justify-center items-center`}
    >
      <CheckCircle size={28} className="mr-[2px]" />
      {text}
    </button>
  )
}
