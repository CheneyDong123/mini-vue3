import { effect } from "../reactivity/effect";
import { EMPTY_OBJECT } from "../shared";
import { ShapeFlags } from "../shared/ShapeFlags";
import { createComponentInstance, setupComponent } from "./component";
import { createAppAPI } from "./createApp";
import { Fragment, Text } from "./vnode";

export function createRenderer(options) {
  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
  } = options;
  function render(vnode, container) {
    // 调用patch

    patch(null, vnode, container, null);
  }
  // n1 -> 老的
  // n2 -> 新的 vnode
  function patch(n1, n2, container, parentComponent) {
    // debugger
    // 处理组件
    // TODO 判断 vnode 是不是一个 element
    // 是 element 那么就应该处理 element
    // console.log(vnode)
    // console.log(container)
    const { type } = n2;
    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent);
        break;

      case Text:
        processText(n1, n2, container);
        break;

      default:
        if (n2.shapeFlags & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parentComponent);
        } else if (n2.shapeFlags & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container, parentComponent);
        }
        break;
    }
  }

  function processText(n1, n2: any, container: any) {
    const { children } = n2;
    const textNode = (n2.el = document.createTextNode(children));

    container.append(textNode);
  }

  function processFragment(n1, n2: any, container: any, parentComponent) {
    mountChildren(n2, container, parentComponent);
  }

  function processElement(n1, n2: any, container: any, parentComponent) {
    if (!n1) {
      mountElement(n2, container, parentComponent);
    } else {
      patchElement(n1, n2, container);
    }
  }

  function patchElement(n1, n2, container) {
    console.log("patchElement");
    console.log("n1", n1);
    console.log("n2", n2);
    const oldProps = n1.props || EMPTY_OBJECT;
    const newProps = n2.props || EMPTY_OBJECT;

    const el = (n2.el = n1.el);
    patchProp(el, oldProps, newProps);
  }

  function patchProp(el, oldProps, newProps) {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        const prevProp = oldProps[key];
        const nextProp = newProps[key];
        console.log("old---", prevProp);
        console.log("new---", nextProp);

        if (prevProp !== nextProp) {
          hostPatchProp(el, key, prevProp, nextProp);
        }
      }
      if (oldProps !== EMPTY_OBJECT) {
        // 未运行，？？？？
        for (const key in oldProps) {
          console.log(1);
          console.log(newProps);
          console.log(oldProps);

          if (!(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null);
          }
        }
      }
    }
  }

  function mountElement(vnode: any, container: any, parentComponent) {
    const { type, props, children, shapeFlags } = vnode;
    const el = (vnode.el = hostCreateElement(type));

    if (shapeFlags & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children;
    } else if (shapeFlags & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(vnode, el, parentComponent);
    }

    for (const key in props) {
      const val = props[key];

      hostPatchProp(el, key, null, val);
    }

    hostInsert(el, container);
  }

  function mountChildren(vnode: any, container: any, parentComponent) {
    vnode.children.forEach((v) => {
      patch(null, v, container, parentComponent);
    });
  }

  function processComponent(n1, n2: any, container: any, parentComponent) {
    mountComponent(n2, container, parentComponent);
  }

  function mountComponent(initialVnode: any, container, parentComponent) {
    const instance = createComponentInstance(initialVnode, parentComponent);

    setupComponent(instance);

    setupRenderEffect(instance, initialVnode, container);
  }

  function setupRenderEffect(instance: any, initialVnode, container) {
    // debugger
    effect(() => {
      if (!instance.isMounted) {
        // init
        const { proxy } = instance;

        const subTree = (instance.subTree = instance.render.call(proxy));

        // subTree : vnode
        patch(null, subTree, container, instance);

        initialVnode.el = subTree.el;
        instance.isMounted = true;
      } else {
        // update
        const { proxy } = instance;
        const subTree = instance.render.call(proxy);
        const prevSubTree = instance.subTree;
        const newSubTree = subTree;

        instance.subTree = newSubTree;
        patch(prevSubTree, newSubTree, container, instance);
      }
    });
  }

  return {
    createApp: createAppAPI(render),
  };
}
