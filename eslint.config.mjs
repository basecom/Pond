import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier';

export default withNuxt(eslintConfigPrettier, {
    rules: {
        'vue/no-multiple-template-root': 'off'
    }
})
