import fs from 'fs'
import readingTime from 'reading-time'
import path from 'path'
import matter from 'gray-matter'
import niceDateText from './niceDateText'

export default function getAllPosts(folder = 'content/relatos') {
  return fs
    .readdirSync(folder)
    .map((slug) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(folder, slug))
      )
      return {
        slug: slug.replace('.md', ''),
        metadata: data,
        timeToRead: readingTime(content),
        date: niceDateText(new Date(data.created)),
      }
    })
    .sort((a, b) => new Date(b.metadata.created) - new Date(a.metadata.created))
}
