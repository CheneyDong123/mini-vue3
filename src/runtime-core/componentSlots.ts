import { ShapeFlags } from "../shared/ShapeFlags";

export function initSlots(instance, children) {
  const { vnode } = instance;
  if (vnode.shapeFlags & ShapeFlags.SLOT_CHILDREN) {
    normalizeObjectSlots(instance.slots, children);
  }
}

function normalizeObjectSlots(slots, children) {
  for (const key in children) {
    const value = children[key];
    // console.log("----", value);
    slots[key] = (props) => normalizeSlotValue(value(props));
  }
}

function normalizeSlotValue(value) {
  return Array.isArray(value) ? value : [value];
}
