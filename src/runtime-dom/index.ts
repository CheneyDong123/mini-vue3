import { createRenderer } from "../runtime-core";

function createElement(type) {
  console.log("createElement------");

  return document.createElement(type);
}

function patchProp(el, key, val) {
  console.log("patchProp------");

  const isOn = (key: string) => /^on[A-Z]/.test(key);
  if (isOn(key)) {
    let event = key.slice(2).toLowerCase();
    el.addEventListener(event, val);
  } else {
    el.setAttribute(key, val);
  }
}

function insert(el, container) {
  console.log("insert------");

  container.append(el);
}

const renderer: any = createRenderer({ createElement, patchProp, insert });

export function createApp(...args) {
  return renderer.createApp(...args);
}

export * from "../runtime-core";
