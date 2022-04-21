import { shallowReadonly } from "../reactivity/reative"
import { initProps } from "./componentProps"
import { PublicInstanceProxyHandlers } from "./componentPublicInstance"

export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {}
  }

  return component
}

export function setupComponent(instance) {
  // TODO
  initProps(instance, instance.vnode.props)
  // initSlots()

  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
  // debugger
  const Component = instance.type

  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers)

  const { setup } = Component

  if (setup) {
    // function / Object
    const setupResult = setup(shallowReadonly(instance.props))

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

