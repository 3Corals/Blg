import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import ChangeTheme from '../components/ChangeTheme'
import Logo from '../components/Logo'
import getCanonical from '../utils/getCanonical'

import '../styles/main.css'
import '../styles/highlightcode.css'
import TikTok from '../components/Icons/TikTok'
import Insta from '../components/Icons/Insta'

export default function Layout({ Component, pageProps }) {
  const { pathname, asPath } = useRouter()
  const isActive = (link) => (pathname.startsWith(link) ? 'active' : '')
  const isDefaultMeta =
    pathname !== '/relatos/[slug]' && pathname !== '/poemas/[slug]'
  const mainClass =
    pathname.startsWith('/poemas/') ||
    pathname.startsWith('/relatos/') ||
    pathname.startsWith('/microrrelatos/')
      ? 'blog'
      : ''

  const data = {
    url: getCanonical(asPath),
    title: 'B.Sánchez',
    description: 'Relatos y poemas de B.Sánchez.',
    cover_image: 'https://bsanchez.es/images/logo.svg',
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
        <Link href="/" title="Go to homepage" className="logo">
          <Logo />
        </Link>
        <nav>
          <Link href="/microrrelatos" className={isActive('/microrrelatos')}>
            Microrrelatos
          </Link>
          <Link href="/poemas" className={isActive('/poemas')}>
            Poemas
          </Link>
          <Link href="/relatos" className={isActive('/relatos')}>
            Relatos
          </Link>
        </nav>
      </header>

      <main className={mainClass}>
        <Component {...pageProps} />
      </main>
      <footer>
        <div className="social">
          <a
            href="https://www.instagram.com/bsanchez_relatosypoesia/"
            target="_blank"
            title="@bsanchez_relatosypoesia"
          >
            <Insta />
          </a>
          <a
            href="https://tiktok.com/@bsanchez.es"
            target="_blank"
            title="@bsanchez.es"
          >
            <TikTok />
          </a>
        </div>
        <div className="footer-content">
          <div className="copyright">
            {new Date().getFullYear()} Todos los derechos reservados.
          </div>
          <ChangeTheme />
        </div>
        <div className="invite">
          <a
            className="kofi-link"
            href="https://ko-fi.com/T6T2EYZWC"
            target="_blank"
            title="Invítame a un café"
          >
            <span>Invítame a un café</span>
            <img
              alt="Invítame a un café"
              src="/cup-border.webp"
              height="26"
              className="kofi"
            />
          </a>
        </div>
      </footer>
    </>
  )
}
