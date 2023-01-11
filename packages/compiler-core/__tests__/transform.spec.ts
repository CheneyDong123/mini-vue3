import { transform } from "../src/transform";
import { baseParse } from "../src/parse";
import { NodeTypes } from "../src/ast";
import { describe, it, expect } from "vitest"


describe("transform", () => {
  it("happy path", () => {
    const ast = baseParse("<div>hi,{{message}}</div>");
    console.log("11111", ast);

    const plugin = (node) => {
      if (node.type == NodeTypes.TEXT) {
        node.content += " mini-vue";
      }
    };

    transform(ast, {
      nodeTransforms: [plugin],
    });

    const nodeText = ast.children[0].children[0];

    expect(nodeText.content).toBe("hi, mini-vue");
  });
});
