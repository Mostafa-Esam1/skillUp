/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)', surface: 'var(--surface)', fg: 'var(--fg)', muted: 'var(--muted)',
        line: 'var(--line)', soft: 'var(--soft)', primary: 'var(--primary)',
        'on-primary': 'var(--on-primary)', accent: 'var(--accent)', 'on-accent': 'var(--on-accent)',
        ok: 'var(--ok)', danger: 'var(--danger)',
      },
      fontFamily: {
        display: ['"Readex Pro"', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        body: ['"IBM Plex Sans Arabic"', '"Segoe UI"', 'Tahoma', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
