import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * En GitHub Pages el sitio cuelga de /taller/, así que la compilación necesita
 * esa base para que los assets no apunten a la raíz del dominio.
 * En desarrollo se sirve desde la raíz para no complicar la URL local.
 */
export default defineConfig(({ command, isPreview }) => ({
  // `command` es 'serve' tanto en dev como en preview: sin `isPreview`,
  // la previsualización de la build serviría con la base equivocada.
  base: command === 'build' || isPreview ? '/taller/' : '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssTarget: 'chrome80',
    rollupOptions: {
      output: {
        // Framer Motion pesa más que el resto junto: en su propio archivo
        // se cachea aparte y no se reenvía al cambiar el contenido de la web.
        manualChunks: {
          motion: ['framer-motion'],
          react: ['react', 'react-dom'],
        },
      },
    },
  },
}))
