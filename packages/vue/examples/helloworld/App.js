import { h } from "../../dist/vue.esm.js"
import { Foo } from "./Foo.js"

window.self = null
export const App = {
  name: "App",
  render() {
    window.self = this
    return h(
      "div",
      {
        id: "root",
        onClick() {
          console.log("click")
        },
        onMousedown() {
          console.log("mousedown")
        }
      },

      [h("p", { class: "red" }, "hi"), h("p", { class: "blue" }, this.msg), h(Foo, {count:1})]
      // "hello " + this.msg
    )
  },
  setup() {
    return {
      msg: "mini-vue3"
    }
  }
}