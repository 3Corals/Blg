import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Tag({
  folder = 'content/poemas',
  label,
  search = '',
  onClick,
}) {
  const { pathname, query } = useRouter()
  const tag = label.toLowerCase()
  const tags = search.split(' ').map((t) => t.toLowerCase())
  const isActive = tags.includes(tag)
  const path = folder.replace('content', '')
  let href = `${path}?q=${label}`

  if (pathname === '/poemas' || pathname === '/relatos') {
    href = query.q ? `${pathname}?q=${query.q}+${label}` : `${path}?q=${label}`
  }

  if (isActive) {
    const q = tags.filter((t) => t !== tag).join('+')
    href = q ? `${path}?q=${q}` : path
  }

  return (
    <Link href={href}>
      <a onClick={onClick} className={`tag ${isActive ? 'active' : ''}`}>
        {label}
      </a>
    </Link>
  )
}
