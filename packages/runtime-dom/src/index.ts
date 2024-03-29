import { createRenderer } from "@dc-mini-vue3/runtime-core";

function createElement(type) {
  // console.log("createElement------");

  return document.createElement(type);
}

function patchProp(el, key, prevVal, nextVal) {
  // console.log("patchProp------");

  const isOn = (key: string) => /^on[A-Z]/.test(key);
  if (isOn(key)) {
    let event = key.slice(2).toLowerCase();
    el.addEventListener(event, nextVal);
  } else {
    if (nextVal === undefined || nextVal === null) {
      console.log("runtime----", key);

      el.removeAttribute(key);
    } else {
      el.setAttribute(key, nextVal);
    }
  }
}

function insert(child, parent, anchor) {
  // console.log("insert------");
  parent.insertBefore(child, anchor || null);
}

function remove(child) {
  const parent = child.parentNode;
  if (parent) {
    parent.removeChild(child);
  }
}

function setElementText(el, text) {
  el.textContent = text;
}

const renderer: any = createRenderer({
  createElement,
  patchProp,
  insert,
  remove,
  setElementText,
});

console.log("renderer", renderer);


export function createApp(...args) {
  return renderer.createApp(...args);
}

export * from "@dc-mini-vue3/runtime-core";
