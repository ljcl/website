/* @ts-check */
import StyleDictionary from "style-dictionary";
import { fileHeader } from "style-dictionary/utils";

/**
 * Style Dictionary Configuration - Three-Tier Token System
 *
 * Tier 1 (Options): Raw design values in tokens/options/
 * Tier 2 (Decisions): Design intentions in tokens/decisions/
 * Tier 3 (Components): Component-specific tokens (future)
 *
 * Key Innovation: Single source with default/inverse variants
 * - Light mode outputs .default variants (suffix removed)
 * - Dark mode outputs .inverse variants (suffix removed, wrapped in media query)
 */

/**
 * Register transform to remove '-default' suffix from token names
 * @type {import('style-dictionary/types').Transform}
 */
const stripDefaultTransform = {
  name: "name/kebab/strip-default",
  type: "name",
  transform: (token) => {
    // Convert path to kebab-case and remove '-default' suffix
    return token.path.join("-").replace(/-default$/, "");
  },
};

StyleDictionary.registerTransform(stripDefaultTransform);

/**
 * Register custom format for dark mode (inverse variant)
 * @type {import('style-dictionary/types').Format}
 */
const inverseCSSFormat = {
  name: "css/variables-inverse",
  format: async ({ dictionary, file, options }) => {
    const { outputReferences } = options;

    const header = await fileHeader({ file });

    // Filter to tokens with 'inverse' in their path
    const inverseTokens = dictionary.allTokens.filter((token) =>
      token.path.includes("inverse"),
    );

    // Format each token, removing '.inverse' from the name
    const variables = inverseTokens
      .map((token) => {
        const cleanName = token.name.replace(/-inverse$/, "");
        const name = `--${cleanName}`;
        let value = token.value;

        // Handle references
        if (outputReferences && token.original) {
          const originalValue = token.original.value;
          if (
            typeof originalValue === "string" &&
            originalValue.match(/^\{.+\}$/)
          ) {
            const refPath = originalValue.slice(1, -1).replace(/\./g, "-");
            value = `var(--${refPath})`;
          }
        }

        const comment = token.comment ? ` /** ${token.comment} */` : "";
        return `    ${name}: ${value};${comment}`;
      })
      .join("\n");

    return `${header}@media (prefers-color-scheme: dark) {\n  :root {\n${variables}\n  }\n}\n`;
  },
};

StyleDictionary.registerFormat(inverseCSSFormat);

/**
 * Light mode configuration (default variants only)
 * @type {import('style-dictionary/types').Config}
 */
const lightConfig = {
  source: ["tokens/options/**/*.json", "tokens/decisions/**/*.json"],

  platforms: {
    css: {
      // Use custom transform that strips '-default' suffix
      transforms: [
        "attribute/cti",
        "name/kebab/strip-default",
        "time/seconds",
        "html/icon",
        "size/rem",
        "color/css",
        "asset/url",
        "fontFamily/css",
        "cubicBezier/css",
        "strokeStyle/css/shorthand",
        "border/css/shorthand",
        "typography/css/shorthand",
        "transition/css/shorthand",
        "shadow/css/shorthand",
      ],
      buildPath: "generated/tokens/",

      files: [
        {
          destination: "variables-light.css",
          format: "css/variables",
          // Filter: exclude 'inverse' tokens
          filter: (token) => !token.path.includes("inverse"),
          options: {
            outputReferences: true,
          },
        },
      ],
    },

    ts: {
      transformGroup: "js",
      buildPath: "generated/tokens/",
      files: [
        {
          destination: "tokens.ts",
          format: "javascript/es6",
          options: {
            outputReferences: true,
          },
        },
        {
          destination: "tokens.d.ts",
          format: "typescript/es6-declarations",
        },
      ],
    },

    json: {
      transformGroup: "js",
      buildPath: "generated/tokens/",
      files: [
        {
          destination: "tokens-metadata.json",
          format: "json/nested",
        },
      ],
    },
  },

  log: {
    warnings: "warn",
    verbosity: "default",
  },
};

/**
 * Dark mode configuration (inverse variants only)
 * @type {import('style-dictionary/types').Config}
 */
const darkConfig = {
  source: ["tokens/options/**/*.json", "tokens/decisions/**/*.json"],

  platforms: {
    "css-dark": {
      transforms: ["attribute/cti", "name/kebab"],
      buildPath: "generated/tokens/",
      files: [
        {
          destination: "variables-dark.css",
          format: "css/variables-inverse",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },

  log: {
    warnings: "warn",
    verbosity: "default",
  },
};

/**
 * Export both light and dark configurations
 * @type {import('style-dictionary/types').Config[]}
 */
export default [lightConfig, darkConfig];
