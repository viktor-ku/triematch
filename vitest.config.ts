import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: { '@': resolve(process.cwd(), 'src') },
  },
  test: {
    include: ['tests/**/*.spec.{js,ts}'],
    environment: 'node',
    globals: false,
    reporters: 'default',
  },
})


