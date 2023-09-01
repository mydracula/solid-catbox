import solid from 'solid-start/vite'
import { defineConfig } from 'vite'
import vercel from 'solid-start-vercel'
import netlify from 'solid-start-netlify'

const adapter = () => {
  if (process.env.VERCEL) {
    return vercel({ edge: true })
  } else if (process.env.NETLIFY) {
    return netlify({ edge: true })
  } else {
    return 'node'
  }
}

export default defineConfig({
  plugins: [
    solid({
      inspect: false,
      ssr: true,
      adapter: adapter()
    })
  ]
})
