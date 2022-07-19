import Head from 'next/head'
import fs from 'fs'

import BlogSeries from '../../components/BlogSeries'
import Newsletter from '../../components/Newsletter'
import PostInfo from '../../components/PostInfo'
import PostItem from '../../components/PostItem'
import Tag from '../../components/Tag'
import addCustomPostWidgets from '../../utils/addCustomPostWidgets'
import clearPage from '../../utils/clearPage'
import getMorePosts from '../../utils/getMorePosts'
import readPost from '../../utils/readPost'

const folder = 'content/poemas'

export default function Post({
  __html,
  data,
  date,
  morePosts,
  series,
  slug,
  timeToRead,
}) {
  const tags = data.tags.split(',')

  return (
    <>
      <Head>
        <title key="title">{data.title}</title>
        <meta key="meta-title" name="title" content={data.title} />
        <meta
          key="meta-description"
          name="description"
          content={data.description}
        />
        <meta name="twitter:widgets:theme" />
        <meta name="keywords" content={data.tags} />
        <meta name="twitter:title" content={data.title} />
        <meta key="og:type" property="og:type" content="article" />
        <meta key="meta-og:title" property="og:title" content={data.title} />
        <meta
          key="meta-og:description"
          property="og:description"
          content={data.description}
        />
      </Head>
      <h1 className="post-title">{data.title}</h1>
      <BlogSeries key="series-top" title={data.series} series={series} />
      <div className="post poema" dangerouslySetInnerHTML={{ __html }} />
      <BlogSeries
        style={{ marginTop: 40 }}
        key="series-bottom"
        title={data.series}
        series={series}
      />
      <div style={{ textAlign: 'center ' }}>
        <PostInfo date={date} timeToRead={timeToRead} />
        <div className="tags" style={{ marginBottom: 30 }}>
          {tags.map((tag) => (
            <Tag folder={folder} key={tag} label={tag} />
          ))}
        </div>
      </div>
      <Newsletter />
      {morePosts.length > 0 && (
        <div style={{ marginBottom: 50 }}>
          <b className="related-posts-title">Más...</b>
          {morePosts.map((p) => (
            <PostItem parent="poemas" key={p.slug} {...p} />
          ))}
        </div>
      )}
    </>
  )
}

/**
 * Load all the slugs corresponding to all mardown filenames.
 */
export const getStaticPaths = async () => {
  const files = fs.readdirSync(folder).map(clearPage)
  const paths = files.map((slug) => ({ params: { slug } }))

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const post = readPost(slug, folder)
  const [morePosts, series] = await getMorePosts(post, slug, folder)

  return {
    props: {
      ...post,
      __html: await addCustomPostWidgets(post.__html),
      morePosts,
      series,
      slug,
    },
  }
}
