import { NodeTypes } from "./ast";

export function baseParse(content: string) {
  const context = createParseContext(content);
  return createRoot(parseChildren(context));
}

function createRoot(children) {
  return {
    children,
  };
}

function parseChildren(context) {
  const nodes: any = [];

  let node;
  if (context.source.startsWith("{{")) {
    node = parseInterpolation(context);
  }
  nodes.push(node);

  return nodes;
}

function parseInterpolation(context) {
  const openDelimiter = "{{";

  const closeDelimiter = "}}";

  const closeIndex = context.source.indexOf(
    closeDelimiter,
    openDelimiter.length
  );

  advanceBy(context, openDelimiter.length);

  const rawCnotentLength = closeIndex - openDelimiter.length;

  const rawContent = context.source.slice(0, rawCnotentLength);

  const content = rawContent.trim();

  advanceBy(context, rawCnotentLength + closeDelimiter);

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: content,
    },
  };
}

function createParseContext(content) {
  return {
    source: content,
  };
}

function advanceBy(context, length) {
  context.source = context.source.slice(length);
}
