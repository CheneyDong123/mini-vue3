import { h } from "../../dist/vue.esm.js"

export const Foo = {
  name: "Foo",
  setup(props) {
    console.log(props)

    // 3.shallow readonly
    props.count++
    console.log(props)
  },
  render() {
    return h("div", {}, "foo: " + this.count)
  }
}