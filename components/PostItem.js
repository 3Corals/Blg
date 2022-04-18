import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

import PostInfo from '../components/PostInfo'

export default function PostItem({ parent = 'relatos', slug, metadata, date, timeToRead }) {
  async function navigate() {
    await Router.push(`/${parent}/[slug]?slug=${slug}`, `/${parent}/${slug}`)
    window.scrollTo(0, 0)
  }

  return (
    <div
      onClick={navigate}
      className="post-list-item"
      title={metadata.description}
      aria-label={metadata.description}
    >
      <div className="info">
        <Link
          href={`/${parent}/[slug]?slug=${slug}`}
          as={`/${parent}/${slug}`}
        >
          <a>
            <h2>{metadata.title}</h2>
          </a>
        </Link>
        <PostInfo date={date} timeToRead={timeToRead} hideAuthor />
      </div>
    </div>
  )
}
