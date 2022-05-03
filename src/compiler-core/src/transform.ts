export function transform(root, options) {
  const context = createTranformContext(root, options);

  traverseNode(root, context);

  createRootCodegen(root);
}

function traverseNode(node: any, context) {
  const nodeTransforms = context.nodeTransforms;

  for (let i = 0; i < nodeTransforms.length; i++) {
    const noderTansform = nodeTransforms[i];
    noderTansform(node);
  }

  traverseChildren(node, context);
}

function traverseChildren(node: any, context) {
  const children = node.children;

  if (children) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      transform(child, context);
    }
  }
}

function createTranformContext(root: any, options: any) {
  const context = {
    root,
    nodeTransforms: options.nodeTransforms || [],
  };

  return context;
}
function createRootCodegen(root: any) {
  root.codegenNode = root.children ? root.children[0] : {};
}
