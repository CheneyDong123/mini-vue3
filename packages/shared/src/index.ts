export const extend = Object.assign;

export const EMPTY_OBJECT = {};

export const isObject = (value) => {
  return value !== null && typeof value === "object";
};

export const isString = (value) => {
  return typeof value == "string";
};

export const hasChanged = (val, newValue) => {
  return !Object.is(val, newValue);
};

export const hasOwn = (val, key) =>
  Object.prototype.hasOwnProperty.call(val, key);

export const camelize = (str: string) => {
  return (
    str &&
    str.replace(/-(\w)/, (_, c: string) => {
      return c ? c.toUpperCase() : "";
    })
  );
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toHandlerKey = (str: string) => {
  return str ? "on" + capitalize(str) : "";
};

export { ShapeFlags } from "./ShapeFlags";
export { toDisplayString } from "./toDisplayString";
