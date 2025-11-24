import vue from 'eslint-plugin-vue'
import importPlugin from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'
import vueParser from 'vue-eslint-parser'

export default [
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
      vue,
      import: importPlugin,
      "unused-imports": unusedImports
    },
    rules: {
      "vue/no-unused-vars": "warn",
      "unused-imports/no-unused-imports": "error",
      "import/order": "warn"
    }
  }
]
