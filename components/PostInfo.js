import Link from 'next/link'

export default function PostInfo({ date, timeToRead, hideAuthor }) {
  const authorElement = hideAuthor
    ? null
    : <>{`por `}<Link href="/"><a>B.Sánchez</a></Link>{` el `}</>

  return (
    <time datetime={date} className="post-info">
      {authorElement}
      {`${date} • ${timeToRead.text.replace(/ /g, '\u00A0')}`}
    </time>
  )
}