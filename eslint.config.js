import vue from 'eslint-plugin-vue'
import importPlugin from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'
import vueParser from 'vue-eslint-parser'

export default [
  ...vue.configs["flat/recommended"],
  {
    ignores: [
      'node_modules/**',
      '.vitepress/cache/**',
      '.vitepress/dist/**',
      'dist/**'
    ]
  },
  {
    files: ["**/*.js", "**/*.ts", "**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 2022,
        sourceType: "module"
      }
    },
    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/no-unused-vars": "warn",
      "unused-imports/no-unused-imports": "error",
      "import/order": "warn"
    }
  }
]
