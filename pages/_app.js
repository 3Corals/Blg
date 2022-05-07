import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import ChangeTheme from '../components/ChangeTheme'
import getCanonical from '../utils/getCanonical'

import '../styles/main.css'
import '../styles/highlightcode.css'

export default function Layout({ Component, pageProps }) {
  const { pathname, asPath } = useRouter()
  const [readStory, setreadStory] = useState(false)
  const isActive = (link) => (pathname.startsWith(link) ? 'active' : '')
  const isDefaultMeta =
    pathname !== '/relatos/[slug]' && pathname !== '/poemas/[slug]'
  const mainClass =
    pathname.startsWith('/poemas/') || pathname.startsWith('/relatos/')
      ? 'blog'
      : ''

  const data = {
    url: getCanonical(asPath),
    title: 'B.Sánchez',
    description: 'Relatos y poemas de B.Sánchez.',
    cover_image: 'https://aralroca.com/images/profile_full.jpg',
    tags: 'relatos, relato, poemas, poema, español, castellano',
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {isDefaultMeta && (
          <>
            <title key="title">{data.title}</title>
            <meta name="monetization" content="$ilp.uphold.com/QjjKbnm6Dazp" />
            <meta key="meta-title" name="title" content={data.title} />
            <meta
              key="meta-description"
              name="description"
              content={data.description}
            />
            <meta key="meta-tags" name="keywords" content={data.tags} />
            <meta name="twitter:title" content={data.title} />
            <meta key="og:type" property="og:type" content="website" />
            <meta
              key="meta-og-image"
              property="og:image"
              content={data.cover_image}
            />
            <meta
              key="meta-og:title"
              property="og:title"
              content={data.title}
            />
            <meta
              key="meta-og:description"
              property="og:description"
              content={data.description}
            />
          </>
        )}
        <meta key="meta-og:url" property="og:url" content={data.url} />
        <link
          key="canonical"
          rel="canonical"
          href={pageProps.data?.canonical || data.url}
        />
      </Head>
      <header>
        <Link href="/">
          <a title="Go to homepage" className="logo">
            <img
              alt="B.Sánchez's personal web site"
              src="/images/logo.svg"
              width={48}
              height={48}
            />
            <span>B.Sánchez</span>
          </a>
        </Link>
        <nav>
          <Link href="/poemas">
            <a className={isActive('/poemas')}>Poemas</a>
          </Link>
          <Link href="/relatos">
            <a className={isActive('/relatos')}>Relatos</a>
          </Link>
        </nav>
      </header>

      <main className={mainClass}>
        <Component {...pageProps} />
      </main>
      <footer>
        <ChangeTheme />
      </footer>
    </>
  )
}
