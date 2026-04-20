/**
 * @license
 * Copyright 2025 Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

import type { SlashCommand, SlashCommandActionReturn } from './types.js';
import { CommandKind } from './types.js';
import { t } from '../../i18n/index.js';

export const apiSwitchCommand: SlashCommand = {
  name: 'api-switch',
  kind: CommandKind.BUILT_IN,
  get description() {
    return t('Switch between configured API endpoints');
  },
  action: async (_context): Promise<SlashCommandActionReturn> => ({
    type: 'dialog',
    dialog: 'api-switch',
  }),
};