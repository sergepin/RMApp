import { defineConfig, mergeConfig } from 'vite'
import { defineConfig as defineVitestConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default mergeConfig(
  defineConfig({
    plugins: [react(),
      tailwindcss(),
    ],
    server: {
      port: 3000,
      proxy: {
        '/graphql': {
          target: 'http://localhost:4000',
          changeOrigin: true
        }
      }
    }
  }),
  defineVitestConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
    }
  })
)