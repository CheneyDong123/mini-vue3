import typescript from "@rollup/plugin-typescript"
export default {
  input: "./packages/vue/src/index.ts",
  output: [
    // cjs - common.js
    // esm 
    {
      format: "cjs",
      file: "packages/vue/dist/vue.cjs.js"
    },
    {
      format: "es",
      file: "packages/vue/dist/vue.esm.js"
    }
  ],

  plugins: [typescript()]
}