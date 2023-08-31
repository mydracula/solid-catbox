import solid from 'solid-start/vite'
import { defineConfig } from 'vite'
export default defineConfig({
  server: {
    port: 3000,
    open: true,
    hmr: true,
    proxy: {
      '/dev': {
        target: 'https://tuphp.hicks.workers.dev/',
        https: false,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/dev/, ''),
        bypass (req, res, opt) {
          const proxyUrl =
            new URL(opt.rewrite(req.url) || '', opt.target)?.href || ''
          res.setHeader('x-res-proxyUrl', proxyUrl)
        }
      }
    }
  },
  plugins: [solid()]
})
