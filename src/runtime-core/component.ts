export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type
  }

  return component
}

export function setupComponent(instance) {
  // TODO
  // initProps()
  // initSlots()

  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
  const Component = instance.type

  const { setup } = Component

  if (setup) {
    // function / Object
    const setupResult = setup()

    handleSetupResult(instance, setupResult)
  }
}

function handleSetupResult(instance, setupResult: any) {
  //  TODO function
  if (typeof setupResult === "object") {
    instance.setupState = setupResult
  }

  finishCompomentSetup(instance)
}

function finishCompomentSetup(instance: any) {
  const Component = instance.type

  // if (Component.render) {
    instance.render = Component.render
  // }
}

