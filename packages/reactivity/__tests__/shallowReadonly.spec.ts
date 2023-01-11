import { vi } from "vitest"
import { isReadonly, shallowReadonly } from "../src/reative"

describe("shallowReadonly", () => {
  
  test("should not make non-reactive properties reative", () => {
    const props = shallowReadonly({ n: { foo: 1 } })
    expect(isReadonly(props)).toBe(true)
    expect(isReadonly(props.n)).toBe(false)
  })

  it("should call console.warn when set", ()=>{

    console.warn = vi.fn()
    const user = shallowReadonly({
      user: 10
    })

    user.age++
    expect(console.warn).toHaveBeenCalled()
  })
})