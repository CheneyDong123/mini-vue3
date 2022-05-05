// mini-vue 出口

export * from "./runtime-dom";

import { baseCompile } from "./compiler-core/src";
import * as runtimeDom from "./runtime-dom";
import {registerRuntimeComplier} from "./runtime-dom"


function compilerToFunction(template) {
  const { code } = baseCompile(template);

  const render = new Function("Vue", code)(runtimeDom);

  return render;
}

registerRuntimeComplier(compilerToFunction)
