import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    nuxt: {
      sortConfigKeys: true,
    },
    typescript: {
      strict: true,
    },
    tooling: {
      jsdoc: true,
      regexp: true,
      unicorn: true,
    },
    stylistic: true,
  },
})
  .override('nuxt/vue/single-root', {
    rules: {
      'vue/no-multiple-template-root': 'off',
    },
  })
