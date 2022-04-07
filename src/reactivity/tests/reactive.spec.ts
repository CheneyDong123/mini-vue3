import { reactive } from "../reative"

describe("reactive", ()=>{
  it("happy path", ()=>{
    const original = { foo: 1 }

    const observer = reactive(original)

    expect(original).not.toBe(observer)

    expect(observer.foo).toBe(1)
  })
})