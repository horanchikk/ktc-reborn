import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
    plugins: [vue()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./vitest.setup.ts'],
        deps: {
            inline: [/@nuxt/, /#app/, /#imports/]
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./', import.meta.url)),
            '~': fileURLToPath(new URL('./', import.meta.url)),
            '#app': fileURLToPath(new URL('./.nuxt/types/app.d.ts', import.meta.url)),
            '#imports': fileURLToPath(new URL('./.nuxt/types/imports.d.ts', import.meta.url))
        }
    },
    optimizeDeps: {
        include: ['vue', 'pinia']
    }
}) 