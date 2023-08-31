import solid from 'solid-start/vite'
import { defineConfig } from 'vite'
import vercel from 'solid-start-vercel'


export default defineConfig({
  plugins: [
    solid({
      inspect: false,
      ssr: true,
      adapter: vercel({
        edge: true
      })
    })
  ]
})
