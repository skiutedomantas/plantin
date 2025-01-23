import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'


export default defineConfig({
  base: '/plantin/',
  // plugins: [imagetools()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  }
})


