import { raw as parse } from 'hast-util-raw';
import type { Element, ElementContent } from 'hast';
import { toString } from 'hast-util-to-string';
import { visit, Parent } from 'unist-util-visit';
import type { Visitor } from 'unist-util-visit/complex-types';
import { Highlighter, Lang } from 'shiki';

const isElement = (item: ElementContent): item is Element =>
  item.type === 'element';

function attacher(options: {
  highlighter: Highlighter;
  ignoreUnknownLanguage: boolean;
}) {
  const highlighter = options.highlighter;
  const loadedLanguages = highlighter.getLoadedLanguages();
  const ignoreUnknownLanguage =
    options.ignoreUnknownLanguage == null
      ? true
      : options.ignoreUnknownLanguage;

  const transformer = (tree: Parent): void => {
    const visitor: Visitor<Element, Element> = (node, _index, parent) => {
      if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') {
        return;
      }

      let lang = getLanguage(node);

      if (lang && ignoreUnknownLanguage && !loadedLanguages.includes(lang)) {
        lang = undefined;
      }

      const code = parse({
        type: 'raw',
        value: highlighter.codeToHtml(toString(node), lang),
      });

      // Add a `block` prop so we can style inline code differently
      if (code && code.type === 'element') {
        if (isElement(code.children?.[0])) {
          if (code.children[0].properties) {
            code.children[0].properties.block = true;
          }
        }

        if (code.properties) {
          code.properties.lang = lang;
        }
        parent.properties = code.properties;
        parent.children = code.children;
      }
    };
    visit(tree, 'element', visitor);
  };

  return transformer;
}

function getLanguage(node: Element): Lang | undefined {
  const className = (node?.properties?.className as string[]) || [];

  for (const classListItem of className) {
    if (classListItem.slice(0, 9) === 'language-') {
      return classListItem.slice(9).toLowerCase() as Lang;
    }
  }

  return undefined;
}

export default attacher;
