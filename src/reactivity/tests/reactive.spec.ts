import {  isReactive, reactive } from "../reative"

describe("reactive", ()=>{
  it("happy path", ()=>{
    const original = { foo: 1 }

    const observer = reactive(original)

    expect(original).not.toBe(observer)

    expect(observer.foo).toBe(1)

    expect(isReactive(observer)).toBe(true)
    expect(isReactive(original)).toBe(false)
  })
})