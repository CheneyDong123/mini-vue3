import { h } from "../../lib/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";

export const App = {
  name: "App",
  render() {
    const app = h("div", {}, "App");
    // const foo = h(Foo, {}, h("div", {}, "slot"))
    const foo = h(
      Foo,
      {},
      {
        header: ({ age }) => h("div", {}, "slot" + age),
        footer: () => h("div", {}, "456"),
      }
    );
    return h("div", {}, [app, foo]);
  },
  setup() {
    return {};
  },
};
