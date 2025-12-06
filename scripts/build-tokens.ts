#!/usr/bin/env node

/**
 * Build Design Tokens
 *
 * Runs Style Dictionary to generate CSS custom properties,
 * TypeScript definitions, and JSON metadata from token sources.
 */

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import StyleDictionary, { type Config } from "style-dictionary";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const configPath = join(__dirname, "../style-dictionary.config.js");

interface ConfigModule {
  default: Config | Config[];
}

async function buildTokens(): Promise<void> {
  try {
    const configModule = (await import(configPath)) as ConfigModule;
    const configs = Array.isArray(configModule.default)
      ? configModule.default
      : [configModule.default];

    for (const config of configs) {
      const sd = new StyleDictionary(config);
      await sd.buildAllPlatforms();
    }
  } catch (error) {
    const err = error as Error;
    console.error("\n❌ Error building tokens:", err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

void buildTokens();
