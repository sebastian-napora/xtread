/**
 * @license
 * Copyright 2025 Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { env } from 'node:process';
import { parse as parseToml } from '@iarna/toml';

/**
 * Represents a named API configuration loaded from the keys file.
 */
export interface ApiConfig {
  /** Display name used in the UI picker */
  name: string;
  /** API key value */
  apiKey: string;
  /** Base URL of the API (optional, defaults to OpenAI base URL) */
  baseUrl?: string;
  /** Optional model identifier override */
  model?: string;
  /** Whether this is a local/LLM endpoint (affects UI label) */
  isLocal?: boolean;
}

/**
 * Parsed result from the xtread keys file.
 */
export interface ParsedKeysFile {
  /** Legacy KEY=value entries (injected into process.env) */
  envVars: Record<string, string>;
  /** Named API configs found under [[api]] sections */
  apiConfigs: ApiConfig[];
}

/**
 * Parses the xtread keys file in TOML format.
 *
 * Supports:
 * - Legacy KEY=value lines (backward compat + env injection)
 * - Named [[api]] sections with name, api_key, base_url, model, is_local fields
 *
 * Search order:
 * 1. /etc/xtread/keys  (system-wide, admin-managed)
 * 2. ~/.xtread/keys    (user-level fallback)
 * 3. ~/.qwen/keys      (legacy path — kept for backward compat after rename)
 *
 * Example TOML file:
 * ```
 * # Legacy env var
 * OPENAI_API_KEY=sk-...
 *
 * [[api]]
 * name = "OpenAI Paid"
 * api_key = "sk-proj-..."
 * base_url = "https://api.openai.com/v1"
 * model = "gpt-4o"
 *
 * [[api]]
 * name = "Local Llama"
 * api_key = "ollama"
 * base_url = "http://localhost:1111/v1"
 * is_local = true
 * ```
 */
export function parseKeysFile(): ParsedKeysFile {
  const candidates = [
    '/etc/xtread/keys',
    resolve(env['HOME'] ?? '', '.xtread/keys'),
    // Backward compat: also check old ~/.qwen/keys path after rename
    resolve(env['HOME'] ?? '', '.qwen/keys'),
  ];

  const envVars: Record<string, string> = {};
  const apiConfigs: ApiConfig[] = [];

  for (const filePath of candidates) {
    try {
      const content = readFileSync(filePath, 'utf8');

      // First pass: collect legacy KEY=value lines (before any TOML section)
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        if (trimmed.startsWith('[')) break; // TOML section detected — stop legacy parsing
        const eqIndex = trimmed.indexOf('=');
        if (eqIndex < 0) continue;
        const key = trimmed.slice(0, eqIndex);
        const value = trimmed.slice(eqIndex + 1).trim();
        if (!(key in env)) {
          envVars[key] = value;
          env[key] = value;
        }
      }

      // Second pass: parse TOML [[api]] sections
      const parsed = parseToml(content);

      if (parsed && typeof parsed === 'object') {
        // Handle `[[api]]` (array of tables) and `api = [...]` (inline array)
        const apiArray: unknown[] = [];
        if (Array.isArray(parsed['api'])) {
          apiArray.push(...parsed['api']);
        }
        if (Array.isArray(parsed['apis'])) {
          apiArray.push(...parsed['apis']);
        }

        for (const entry of apiArray) {
          if (entry && typeof entry === 'object') {
            const e = entry as Record<string, unknown>;
            const name = typeof e['name'] === 'string' ? e['name'] : undefined;
            const apiKey =
              typeof e['api_key'] === 'string'
                ? e['api_key']
                : typeof e['apiKey'] === 'string'
                  ? e['apiKey']
                  : undefined;
            if (name && apiKey) {
              apiConfigs.push({
                name,
                apiKey,
                baseUrl:
                  typeof e['base_url'] === 'string'
                    ? e['base_url']
                    : typeof e['baseUrl'] === 'string'
                      ? e['baseUrl']
                      : undefined,
                model:
                  typeof e['model'] === 'string' ? e['model'] : undefined,
                isLocal: e['is_local'] === true || e['isLocal'] === true,
              });
            }
          }
        }
      }

      // Stop at first readable file
      return { envVars, apiConfigs };
    } catch {
      // File not found or not readable — try next candidate
    }
  }

  return { envVars, apiConfigs };
}

/**
 * Loads key=value pairs from the system-wide or user-level keys file
 * and injects them into process.env.
 *
 * Search order:
 * 1. /etc/xtread/keys  (system-wide, set by admin)
 * 2. ~/.xtread/keys    (user-level fallback)
 * 3. ~/.qwen/keys       (legacy path — kept for backward compat after rename)
 *
 * Each line should be: KEY=value
 * Lines starting with # are comments; blank lines are ignored.
 * Values are trimmed; keys are case-sensitive.
 *
 * @deprecated Use `parseKeysFile()` instead for new code that needs API configs.
 */
export function loadSystemKeys(): void {
  parseKeysFile(); // env vars already injected
}
