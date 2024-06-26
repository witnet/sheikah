import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [Vue()],
  test: {
    globals: true,
    setupFiles: [path.resolve(__dirname, './tests/unit/setup')],
    environment: 'jsdom',
  },
  root: path.resolve(__dirname, './tests/unit'),
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
})
