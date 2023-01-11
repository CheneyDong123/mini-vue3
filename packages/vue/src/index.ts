// mini-vue 出口

export * from "@dc-mini-vue3/runtime-dom";

import { baseCompile } from "@dc-mini-vue3/compiler-core";
import * as runtimeDom from "@dc-mini-vue3/runtime-dom";
import {registerRuntimeComplier} from "@dc-mini-vue3/runtime-dom"


function compilerToFunction(template) {
  const { code } = baseCompile(template);

  const render = new Function("Vue", code)(runtimeDom);

  return render;
}

registerRuntimeComplier(compilerToFunction)
