import { effect, stop } from "../effect"
import { reactive } from "../reative"

describe("effect", () => {
  it("happy path", ()=>{
    const user = reactive({
      age: 10
    });
    
    let nextAge;
    effect(()=>{
      nextAge = user.age + 1
    })

    expect(nextAge).toBe(11)

    nextAge++;

    expect(nextAge).toBe(12)
    
  })

  // effect -> function(runner) -> fn -> return
  it("should return runner when call effect", ()=>{
    let foo = 10
    const runner = effect(() => {
      foo++
      return "foo"
    })

    expect(foo).toBe(11)
    const r = runner()
    expect(foo).toBe(12)
    expect(r).toBe("foo")

  })

  it("scheduler", () => {
    let dummy;
    let run: any;
    const scheduler = jest.fn(() => {
      run = runner;
    });
    const obj = reactive({ foo: 1 });
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      { scheduler }
    );
    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1);
    obj.foo++
    expect(scheduler).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1)
    runner()
    expect(dummy).toBe(2)
  })

  it("stop", () => {
    let dummy;
    const obj  = reactive({ prop: 1 })
    const runner = effect(() => {
      dummy = obj.prop;
    })
    obj.prop = 2;
    expect(dummy).toBe(2)
    stop(runner);
    // obj.prop = 3
    obj.prop++
    expect(dummy).toBe(2)

    runner()
    expect(dummy).toBe(3)
  })

  it("onStop", () => {
    const obj = reactive({
      foo: 1
    });
    const onStop = jest.fn();
    let dummy;
    const runner = effect(
      () => {
        dummy = obj.foo
      },
      {
        onStop
      }
    );

    stop(runner)
    expect(onStop).toBeCalledTimes(1)
  })
})