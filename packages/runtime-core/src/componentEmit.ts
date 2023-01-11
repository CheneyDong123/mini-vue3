import { camelize, toHandlerKey } from "@dc-mini-vue3/shared"

export function emit(instance, event, ...args) {
  // console.log("emitF --", event);

  const { props } = instance

  const handlerName = toHandlerKey(camelize(event))
  const handler = props[handlerName]

  handler && handler(...args)

}