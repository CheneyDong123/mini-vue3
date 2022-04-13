import { isProxy, isReadonly, readonly } from "../reative";


describe("readonly", ()=>{
  
  it("should make nested values Readonly", () => {
    const original = { foo: 1, bar: { baz: 2 } };
    const wrapped = readonly(original);
    expect(wrapped).not.toBe(original)
    expect(isReadonly(wrapped)).toBe(true)
    expect(isReadonly(original)).toBe(false)
    expect(isReadonly(wrapped.bar)).toBe(true)
    expect(isReadonly(original.bar)).toBe(false)
    expect(isProxy(wrapped)).toBe(true)
    expect(wrapped.foo).toBe(1)
  });

  it("when then call set", ()=>{

    console.warn = jest.fn()
    const user = readonly({
      user: 10
    })

    user.age++
    expect(console.warn).toBeCalled()
  })
});