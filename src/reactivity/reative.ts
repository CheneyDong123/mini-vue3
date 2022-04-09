import { mutableHandlers, readonlyHandlers } from "./baseHandlers"

export function reactive(raw) {
  return createReavtiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return createReavtiveObject(raw, readonlyHandlers)
}

function createReavtiveObject(raw, baseHandlers) {
  return new Proxy(raw, baseHandlers)
}