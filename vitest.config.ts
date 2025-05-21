import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    server: {
      deps: {
        inline: ['fastify', '@fastify/jwt', '@prisma/client']
      }
    }
  }
})
