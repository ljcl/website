import { raw as parse } from 'hast-util-raw';
import type { Element, ElementContent } from 'hast';
import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';
import type { Visitor } from 'unist-util-visit/complex-types';
import { Highlighter, Lang } from 'shiki';

const hasTagname = (item: ElementContent): item is Element => 'tagName' in item;

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

  const transformer = (tree) => {
    const visitor: Visitor = (node: Element, _index, parent?: Element) => {
      if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') {
        return;
      }

      let lang = getLanguage(node);

      if (ignoreUnknownLanguage && !loadedLanguages.includes(lang)) {
        lang = null;
      }

      const code = parse({
        type: 'raw',
        value: highlighter.codeToHtml(toString(node), lang),
      }) as Element;

      // Add a `block` prop so we can style inline code differently
      if (hasTagname(code.children?.[0])) {
        code.children[0].properties.block = true;
      }

      code.properties.lang = lang;
      parent.properties = code.properties;
      parent.children = code.children;
    };
    visit(tree, 'element', visitor);
  };

  return transformer;
}

function getLanguage(node: Element): Lang | null {
  const className = (node.properties.className as string[]) || [];

  for (const classListItem of className) {
    if (classListItem.slice(0, 9) === 'language-') {
      return classListItem.slice(9).toLowerCase() as Lang;
    }
  }

  return null;
}

export default attacher;
