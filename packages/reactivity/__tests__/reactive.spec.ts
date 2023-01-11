import { isProxy, isReactive, reactive } from "../src/reative"

describe("reactive", () => {
  it("happy path", () => {
    const original = { foo: 1 }

    const observer = reactive(original)

    expect(original).not.toBe(observer)

    expect(observer.foo).toBe(1)

    expect(isReactive(observer)).toBe(true)
    expect(isProxy(observer)).toBe(true)
    expect(isReactive(original)).toBe(false)
  })

  test("nested reactive", () => {
    const original = {
      nested: {
        foo: 1
      },
      array: [{ bar: 2 }]
    };
    const observed = reactive(original)
    expect(isReactive(observed.nested)).toBe(true)
    expect(isReactive(observed.array)).toBe(true)
    expect(isReactive(observed.array[0])).toBe(true)
  })
})