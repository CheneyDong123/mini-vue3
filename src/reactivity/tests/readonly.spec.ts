import { readonly } from "../reative";


describe("readonly", ()=>{
  
  it("happy path", () => {
    const original = { foo: 1, bar: { baz: 2 } };
    const wrapped = readonly(original);
    expect(wrapped).not.toBe(original)
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