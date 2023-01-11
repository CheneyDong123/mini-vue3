import { createApp } from "../../dist/vue.esm.js"
import { App } from "./App.js"

const rootContainer = document.querySelector("#app")
// debugger
createApp(App).mount(rootContainer)