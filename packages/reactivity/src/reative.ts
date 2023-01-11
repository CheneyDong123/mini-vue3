import { isObject } from "@dc-mini-vue3/shared"
import { mutableHandlers, readonlyHandlers, shallowReadonlyHandlers } from "./baseHandlers"

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_reactive",
  IS_READONLY = "__v_readonly"
}

export function reactive(raw) {
  return createReavtiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return createReavtiveObject(raw, readonlyHandlers)
}

export function shallowReadonly(raw) {
  return createReavtiveObject(raw, shallowReadonlyHandlers)
}

export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY]
}

export function isProxy(value) {
  return isReactive(value) || isReadonly(value)
}

function createReavtiveObject(raw, baseHandlers) {
  return new Proxy(raw, baseHandlers)
}