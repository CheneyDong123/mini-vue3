import { proxyRefs } from "../reactivity";
import { shallowReadonly } from "../reactivity/reative";
import { emit } from "./componentEmit";
import { initProps } from "./componentProps";
import { PublicInstanceProxyHandlers } from "./componentPublicInstance";
import { initSlots } from "./componentSlots";

export function createComponentInstance(vnode, parent) {
  console.log("createComponentInstance", parent);

  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
    slots: {},
    parent,
    provides: parent ? parent.provides : {},
    isMounted: false,
    subTree: {},
    emit: () => {},
  };

  component.emit = emit.bind(null, component) as any;

  return component;
}

export function setupComponent(instance) {
  // TODO
  initProps(instance, instance.vnode.props);
  initSlots(instance, instance.vnode.children);

  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  // debugger
  const Component = instance.type;

  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);

  const { setup } = Component;

  if (setup) {
    setCurrentInstance(instance);
    // function / Object
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit,
    });

    setCurrentInstance(null);

    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult(instance, setupResult: any) {
  //  TODO function
  if (typeof setupResult === "object") {
    instance.setupState = proxyRefs(setupResult);
  }

  finishCompomentSetup(instance);
}

function finishCompomentSetup(instance: any) {
  const Component = instance.type;

  // if (Component.render) {
  instance.render = Component.render;
  // }
}

let currentInstace = null;

export function getCurrentInstance() {
  return currentInstace;
}

function setCurrentInstance(instance: any) {
  currentInstace = instance;
}
