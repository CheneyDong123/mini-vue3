import { track, trigger } from "./effect"

function createGetter(ifReadonly = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key)
    //依赖（fn）收集
    if (!ifReadonly) {
      track(target, key)
    }
    return res
  }
}

function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value)

    // 依赖实现/触发
    trigger(target, key)
    return res
  }
}
export const mutableHandlers = {
  get: createGetter(),
  set: createSetter()
}

export const readonlyHandlers = {
  get: createGetter(true),
  set(target, key, value) {
    console.warn(`key:${key} set 失败 ,因为 target 是 readonly `,target)
    return true
  }
}