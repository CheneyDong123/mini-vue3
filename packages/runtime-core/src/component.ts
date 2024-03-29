import { proxyRefs, shallowReadonly } from "@dc-mini-vue3/reactivity";
import { emit } from "./componentEmit";
import { initProps } from "./componentProps";
import { PublicInstanceProxyHandlers } from "./componentPublicInstance";
import { initSlots } from "./componentSlots";

export function createComponentInstance(vnode, parent) {
  console.log("createComponentInstance", parent);

  const component = {
    vnode,
    type: vnode.type,
    next: null,
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
  // 当用户在setup里编写render函数
  //  TODO function

  // 当用户在setup之外编写render函数
  if (typeof setupResult === "object") {
    instance.setupState = proxyRefs(setupResult);
  }

  finishCompomentSetup(instance);
}

function finishCompomentSetup(instance: any) {
  const Component = instance.type;
  // 编译模块--编译template模块成render函数
  if (compiler && !Component.render) {
    if (Component.template) {
      Component.render = compiler(Component.template);
    }
  }
  // 如果用户有render，则直接将render函数赋值给组件实例对象
  instance.render = Component.render;
}

let currentInstace = null;

export function getCurrentInstance() {
  return currentInstace;
}

function setCurrentInstance(instance: any) {
  currentInstace = instance;
}

let compiler;

export function registerRuntimeComplier(_compiler) {
  compiler = _compiler;
}
