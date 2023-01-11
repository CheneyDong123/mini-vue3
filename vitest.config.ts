import { defineConfig} from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true
  },
  resolve: {
    alias: [
      {
        find: /@dc-mini-vue3\/(\w*)/,
        replacement: path.resolve(__dirname, 'packages/$1/src/index.ts')
      }
    ]
  }
})