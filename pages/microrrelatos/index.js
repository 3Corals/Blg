import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef, Fragment } from 'react'

import Newsletter from '../../components/Newsletter'
import Pagination from '../../components/Paginator'
import PostItem from '../../components/PostItem'
import Tag from '../../components/Tag'
import filterSearch from '../../utils/filterSearch'
import getAllPosts from '../../utils/getAllPosts'

const itemsPerPage = 10

function Searcher({ search, onSearch }) {
  const label = 'Busca un microrrelato'

  return (
    <input
      className="post-searcher"
      defaultValue={search}
      onChange={onSearch}
      ariaLabel={label}
      placeholder={label}
      type="text"
    />
  )
}

export default function Relatos({ posts, tags }) {
  const router = useRouter()
  const { query } = router
  const key = useRef(Date.now())
  const [search, setSearch] = useState(query.q || '')

  const filteredPosts = search ? posts.filter(filterSearch(search)) : posts
  const [currentPage, setCurrentPage] = useState(parseInt(query.page) || 1)
  const pages = Math.ceil(filteredPosts.length / itemsPerPage)
  const lastIndex = itemsPerPage * currentPage
  const firstIndex = lastIndex - itemsPerPage
  const postsToShow = filteredPosts.slice(firstIndex, lastIndex)

  function onSearch(e) {
    const val = e.target.value.toLowerCase()
    const url = val
      ? `/microrrelatos?q=${e.target.value.toLowerCase()}`
      : '/microrrelatos'
    router.replace(url, undefined, { shallow: true })
  }

  // Update state from param
  useEffect(() => setSearch(query.q || ''), [query.q])
  useEffect(() => setCurrentPage(parseInt(query.page) || 1), [query.page])

  return (
    <Fragment key={postsToShow.length ? 'non-empty' : 'empty'}>
      <Head>
        <title key="title">Relatos - B.Sánchez</title>

        {router.asPath !== router.pathname && (
          <meta key="noIndex" name="robots" content="noindex, follow" />
        )}
      </Head>

      <div className="blog-page-content">
        <div className="posts-box">
          <div className="blog-title">
            <h1>Microrrelatos</h1>
            <div>{filteredPosts.length} microrrelatos</div>
          </div>

          {postsToShow.map((post) => (
            <PostItem parent="microrrelatos" key={post.slug} {...post} />
          ))}

          {pages > 1 && (
            <Pagination
              href={(p) => `/microrrelatos?q=${query.q || ''}&page=${p}`}
              currentPage={currentPage}
              pages={pages}
            />
          )}

          {filteredPosts.length === 0 && (
            <div style={{ marginTop: 50, textAlign: 'center' }}>
              Can't find what you're looking for? Try using{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/search?q=site%3Absanchez.es+${search}`}
              >
                Google
              </a>
              .
            </div>
          )}
        </div>

        <aside className="searcher-box">
          <div className="sticky">
            <Searcher key={key.current} search={search} onSearch={onSearch} />

            <div className="tags" style={{ marginTop: 10 }}>
              {tags.map((tag) => (
                <Tag
                  onClick={() => (key.current = Date.now())}
                  key={tag}
                  folder="content/microrrelatos"
                  label={tag}
                  search={search}
                />
              ))}
            </div>
            <Newsletter />
          </div>
        </aside>
      </div>
    </Fragment>
  )
}

export const getStaticProps = async () => {
  const posts = getAllPosts('content/microrrelatos')
  const tags = posts.reduce((t, post) => {
    const postTags = post.metadata.tags?.split?.(',') || []
    postTags.forEach((tag) => {
      const trimmedTag = tag.trim()
      if (!t.includes(trimmedTag)) t.push(trimmedTag)
    })
    return t
  }, [])

  return { props: { posts, tags } }
}
