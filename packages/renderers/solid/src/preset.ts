/**
 * A preset is a configuration that enables developers to quickly set up and
 * customize their environment with a specific set of features, functionalities, or integrations.
 *
 * @see https://storybook.js.org/docs/addons/writing-presets
 * @see https://storybook.js.org/docs/api/main-config/main-config
 */

import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { PresetProperty } from 'storybook/internal/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Add additional scripts to run in the story preview.
 *
 * @see https://storybook.js.org/docs/api/main-config/main-config-preview-annotations
 */
export const previewAnnotations: PresetProperty<'previewAnnotations'> = async (
  input = [],
  options,
) => {
  const docsConfig = await options.presets.apply('docs', {}, options);
  const docsEnabled = Object.keys(docsConfig).length > 0;
  const result: string[] = [];

  return result
    .concat(input)
    .concat([join(__dirname, 'entry-preview.mjs')])
    .concat(docsEnabled ? [join(__dirname, 'entry-preview-docs.mjs')] : []);
};
