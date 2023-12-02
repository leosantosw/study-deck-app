interface CardContentProps {
  content: string;
  style: React.CSSProperties
  onClick?: () => void
}

export function CardContent({ content, style, onClick }: CardContentProps) {
  return (
    <div
      className="absolute w-full h-full rounded-lg grid place-content-center"
      style={style}
      onClick={onClick}
    >
      {content}
    </div>
  )
}
