import Link from 'next/link'

interface BoxItemProps {
  title: string
  description: string
  label: string
  href: string
}

export const BoxItem = ({ title, description, label, href }: BoxItemProps) => {
  return (
    <Link
      href={href}
      className="relative bg-gray-50 rounded-xl shadow-gray p-5"
    >
      <h3 className="font-primary text-base font-bold text-gray-900 mb-1">
        {title}
      </h3>
      <p className="font-primary text-gray-500 text-sm">{description}</p>
      <div className="font-primary absolute bg-blue-200 text-blue-900 rounded-md p-1 px-2 text-xs top-3 right-5 font-bold">
        {label}
      </div>
    </Link>
  )
}
