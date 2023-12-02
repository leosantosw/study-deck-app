interface ButtonProps {
  color: string
  hoverColor: string
  text: string
  onClick?: () => void
}

export function Button({ color, hoverColor, text, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-${color}-400 hover:bg-${hoverColor}-700 text-white font-bold py-2 px-4 rounded m-1`}
    >
      {text}
    </button>
  )
}

export default Button
