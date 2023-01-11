import { h } from "../../lib/guide-mini-vue.esm.js"
import { Foo } from "./Foo.js"


export const App = {
  name: "App",
  render() {

    return h("div", {}, [h("div", {}, "App"), h(Foo, {
      onAddFoo() {
        console.log("App -- onAddFoo");
      },
      onAdd(a, b) {
        console.log("App -- onAdd", a, b);
      }
    })])

  },
  setup() {
    return {}
  }
}