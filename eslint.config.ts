import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginOxlint from 'eslint-plugin-oxlint'
import pluginVue from 'eslint-plugin-vue'
import { globalIgnores } from 'eslint/config'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', 'src/components/ui/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    name: 'app/custom-rules',
    rules: {
      'vue/multi-word-component-names': ['error', { ignores: ['App', 'Button'] }],
    },
  },

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/*.{test,spec}.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  ...pluginOxlint.configs['flat/recommended'],
  skipFormatting,
)
