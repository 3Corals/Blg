import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import ChangeTheme from '../components/ChangeTheme'
import Logo from '../components/Logo'
import getCanonical from '../utils/getCanonical'

import '../styles/main.css'
import '../styles/highlightcode.css'

export default function Layout({ Component, pageProps }) {
  const { pathname, asPath } = useRouter()
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

  useEffect(() => {
    const text =
      'Reservados todos los derechos. No se permite la reproducción total o parcial de esta obra, ni su incorporación a un sistema informático, ni su transmisión en cualquier forma o por cualquier medio (electrónico, mecánico, fotocopia, grabación u otros) sin autorización previa y por escrito de los titulares del copyright. La infracción de dichos derechos puede constituir un delito contra la propiedad intelectual.'
    const isIe =
      navigator.userAgent.toLowerCase().indexOf('msie') != -1 ||
      navigator.userAgent.toLowerCase().indexOf('trident') != -1

    function denyCopy(e) {
      if (isIe) {
        window.clipboardData.setData('Text', text)
      } else {
        e.clipboardData.setData('text/plain', text)
      }
      e.preventDefault()
    }
    window.addEventListener('copy', denyCopy)
    return () => window.removeEventListener('copy', denyCopy)
  }, [])

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
            <Logo />
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
        <div className="copyright">
          {new Date().getFullYear()} Todos los derechos reservados.
        </div>
        <ChangeTheme />
      </footer>
    </>
  )
}
