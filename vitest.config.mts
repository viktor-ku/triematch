import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: { '@': resolve(process.cwd(), 'src') },
  },
  test: {
    include: ['tests/**/*.spec.{js,ts}'],
    environment: 'node',
    globals: false,
    reporters: ['default'],
  },
})
