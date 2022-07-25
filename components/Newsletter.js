export default function Newsletter() {
  return null
  // TODO: configure
  return (
    <form
      className="newsletter"
      action=""
      method="post"
      target="_blank"
      novalidate
    >
      <h2>¡Entérate de nuevos poemas y relatos! 📩</h2>
      <input
        type="email"
        value=""
        ariaLabel="Tu correo electrónico"
        name="EMAIL"
        id="mce-EMAIL"
        placeholder="Tu correo electrónico"
        required
      />
      <button>Suscribirse</button>
    </form>
  )
}
