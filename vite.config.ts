import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: './',
  }

  // Solo si estamos construyendo para producción (GitHub Pages), cambiamos la ruta
  if (command !== 'serve') {
    config.base = '/generador-informes/'
  }

  return config
})
