import { NodeTypes } from "./ast";

const enum TagType {
  Start,
  End,
}

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
  const s = context.source;
  if (s.startsWith("{{")) {
    node = parseInterpolation(context);
  } else if (s[0] == "<") {
    node = parseElement(context);
  }
  nodes.push(node);

  return nodes;
}
let i = 0;
function parseElement(context) {
  const element = parseTag(context, TagType.Start);

  parseTag(context, TagType.End);

  return element;
}

function parseTag(context: any, type: TagType) {
  const match: any = /^<\/?([a-z]*)/i.exec(context.source);

  const tag = match[1];

  advanceBy(context, match[0].length + 1);

  if (type == TagType.End) return;
  
  return {
    type: NodeTypes.ELEMENT,
    tag: tag,
  };
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
