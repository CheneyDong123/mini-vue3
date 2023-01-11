import { ref } from "../../dist/vue.esm.js";

export const App = {
  name: "App",
  template: `<div>hi,{{message}}{{count}}</div>`,
  setup() {
    const count = (window.count = ref(1));

    return {
      message: "mini-vue",
      count,
    };
  },
};
