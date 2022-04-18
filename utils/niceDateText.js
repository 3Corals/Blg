function niceDateText(date) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return date.toLocaleDateString('es-ES', options)
}

module.exports = niceDateText
