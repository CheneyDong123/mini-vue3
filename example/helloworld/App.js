
import { h } from "../../lib/guide-mini-vue.esm.js"


window.self = null
export const App = {
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

      [h("p", { class: "red" }, "hi"), h("p", { class: "blue" }, this.msg)]
      // "hello " + this.msg
    )
  },
  setup() {
    return {
      msg: "mini-vue3"
    }
  }
}