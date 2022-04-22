import { shallowReadonly } from "../reactivity/reative"
import { emit } from "./componentEmit"
import { initProps } from "./componentProps"
import { PublicInstanceProxyHandlers } from "./componentPublicInstance"
import { initSlots } from "./componentSlots"

export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
    slots: {},
    emit: () => { }
  }

  component.emit = emit.bind(null, component) as any

  return component
}

export function setupComponent(instance) {
  // TODO
  initProps(instance, instance.vnode.props)
  initSlots(instance, instance.vnode.children)

  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
  // debugger
  const Component = instance.type

  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers)

  const { setup } = Component

  if (setup) {
    // function / Object
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit
    })

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

