interface ButtonProps {
  color: 'red' | 'blue' | 'green'
  text: string
  onClick?: () => void
}

export function Button({ color, text, onClick }: ButtonProps) {
  const colorVariants = {
    red: 'bg-red-400 hover:bg-red-600',
    blue: 'bg-blue-400 hover:bg-blue-600',
    green: 'bg-green-400 hover:bg-green-600',
  }

  return (
    <button
      onClick={onClick}
      className={`${colorVariants[color]} text-blue-50 text-xl rounded-lg h-12 m-1 w-24`}
    >
      {text}
    </button>
  )
}
