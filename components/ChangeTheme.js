import { useState, useRef } from 'react'

export default function ChangeTheme() {
  const select = useRef()
  const isNode = typeof window === 'undefined'
  const [theme, setTheme] = useState(
    isNode ? 'system' : window.__theme || 'system'
  )

  function onChangeTheme(e) {
    const { value } = e.target
    window.__setPreferredTheme(value)
    setTheme(value)
  }

  return (
    <div className="change-theme">
      <div className={`selected-theme ${theme}`} />
      <select
        title="Choose another theme"
        aria-label="Choose another theme"
        value={theme}
        ref={select}
        onChange={onChangeTheme}
      >
        <option value="system">Sistema</option>
        <option value="dark">Noche</option>
        <option value="light">Día</option>
      </select>
    </div>
  )
}
