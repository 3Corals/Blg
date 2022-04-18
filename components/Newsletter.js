export default function Newsletter() {
  return (
    <form
      className="newsletter"
      action="https://aralroca.us8.list-manage.com/subscribe/post?u=29d99171aa3f671bde658475a&amp;id=9f1a0b31e3"
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
