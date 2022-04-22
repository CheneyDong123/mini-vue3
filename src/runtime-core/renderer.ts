import { ShapeFlags } from "../shared/ShapeFlags";
import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container) {
  // 调用patch

  patch(vnode, container);
}

function patch(vnode, container) {
  // debugger
  // 处理组件
  // TODO 判断 vnode 是不是一个 element
  // 是 element 那么就应该处理 element
  // console.log(vnode)
  // console.log(container)
  if (vnode.shapeFlags & ShapeFlags.ELEMENT) {
    processElement(vnode, container);
  } else if (vnode.shapeFlags & ShapeFlags.STATEFUL_COMPONENT) {
    processComponent(vnode, container);
  }
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container);
}

function mountElement(vnode: any, container: any) {
  const { type, props, children, shapeFlags } = vnode;
  const el = (vnode.el = document.createElement(type));

  if (shapeFlags & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children;
  } else if (shapeFlags & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el);
  }

  for (const key in props) {
    const val = props[key];

    const isOn = (key: string) => /^on[A-Z]/.test(key);
    if (isOn(key)) {
      let event = key.slice(2).toLowerCase();
      el.addEventListener(event, val);
    } else {
      el.setAttribute(key, val);
    }
  }

  container.append(el);
}

function mountChildren(vnode: any, container: any) {
  vnode.children.forEach((v) => {
    patch(v, container);
  });
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(initialVnode: any, container) {
  const instance = createComponentInstance(initialVnode);

  setupComponent(instance);

  setupRenderEffect(instance, initialVnode, container);
}

function setupRenderEffect(instance: any, initialVnode, container) {
  // debugger
  const { proxy } = instance;

  const subTree = instance.render.call(proxy);

  // subTree : vnode
  patch(subTree, container);

  initialVnode.el = subTree.el;
}
