export default function getCanonical(asPath) {
  return 'https://bsanchez.es' + asPath.replace(/(\?|#).*/, '')
}
