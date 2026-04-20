/**
 * @license
 * Copyright 2025 Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';
import { useMemo } from 'react';
import { Box, Text } from 'ink';
import { theme } from '../semantic-colors.js';
import { DescriptiveRadioButtonSelect } from './shared/DescriptiveRadioButtonSelect.js';
import { parseKeysFile } from '../../utils/systemKeys.js';
import type { ApiConfig } from '../../utils/systemKeys.js';
import { t } from '../../i18n/index.js';

interface ApiSwitchDialogProps {
  onSelect: (config: ApiConfig) => void;
  onCancel: () => void;
}

export function ApiSwitchDialog({
  onSelect,
  onCancel: _onCancel,
}: ApiSwitchDialogProps): React.JSX.Element {
  const apiConfigs = useMemo(() => parseKeysFile().apiConfigs, []);

  const keysPath = '~/.xtread/keys';

  if (apiConfigs.length === 0) {
    return (
      <Box flexDirection="column" paddingLeft={2}>
        <Box>
          <Text bold color={theme.text.accent}>
            {`> ${t('API Switcher')}`}
          </Text>
        </Box>
        <Box marginTop={1} paddingLeft={2}>
          <Text dimColor>{t('No API configurations found. Create one to get started.')}</Text>
        </Box>
        <Box marginTop={1} paddingLeft={2}>
          <Text dimColor>{t('Sample {{path}} file:', { path: keysPath })}</Text>
        </Box>
        <Box marginTop={1} paddingLeft={2} flexDirection="column">
          <Text dimColor>{'# Default endpoint (env var legacy compat)'}</Text>
          <Text dimColor>{'OPENAI_API_KEY=sk-your-key-here'}</Text>
          <Text dimColor />
          <Text dimColor>{'# Named API configs for /api-switch'}</Text>
          <Text dimColor>{'[[api]]'}</Text>
          <Text dimColor>{"  name = \"OpenAI Paid\""}</Text>
          <Text dimColor>{"  api_key = \"sk-proj-...\""}</Text>
          <Text dimColor>{"  base_url = \"https://api.openai.com/v1\""}</Text>
          <Text dimColor>{"  model = \"gpt-4o\""}</Text>
          <Text dimColor />
          <Text dimColor>{'[[api]]'}</Text>
          <Text dimColor>{"  name = \"Local Llama\""}</Text>
          <Text dimColor>{"  api_key = \"ollama\""}</Text>
          <Text dimColor>{"  base_url = \"http://localhost:1111/v1\""}</Text>
          <Text dimColor>{"  is_local = true"}</Text>
        </Box>
        <Box marginTop={1} paddingLeft={2}>
          <Text dimColor>
            {t('Press')} <Text bold>Esc</Text> {t('to cancel')}
          </Text>
        </Box>
      </Box>
    );
  }

  const items = apiConfigs.map((cfg) => ({
    key: cfg.name,
    value: cfg.name,
    title: (
      <Box gap={1}>
        <Text bold>{cfg.name}</Text>
        {cfg.isLocal && (
          <Text color={theme.status.success}>[local]</Text>
        )}
      </Box>
    ),
    description: (
      <Box flexDirection="column" gap={0}>
        <Text dimColor>{cfg.baseUrl ?? t('OpenAI default')}</Text>
        {cfg.model && (
          <Text dimColor>
            {t('Model')}: {cfg.model}
          </Text>
        )}
        <Text dimColor>
          {t('Key')}: {cfg.apiKey.slice(0, 4)}…{cfg.apiKey.slice(-4)}
        </Text>
      </Box>
    ),
  }));

  return (
    <Box flexDirection="column" paddingLeft={2}>
      <Box>
        <Text bold color={theme.text.accent}>
          {`> ${t('API Switcher')}`}
        </Text>
      </Box>
      <Box marginTop={1} paddingLeft={2}>
        <Text dimColor>{t('Select an API endpoint to switch to:')}</Text>
      </Box>
      <Box marginTop={1} paddingLeft={2}>
        <DescriptiveRadioButtonSelect
          items={items}
          onSelect={(name) => {
            const cfg = apiConfigs.find((c) => c.name === name);
            if (cfg) onSelect(cfg);
          }}
          onHighlight={() => {}}
          showNumbers={true}
        />
      </Box>
      <Box marginTop={1} paddingLeft={2}>
        <Text dimColor>
          {t('Press')} <Text bold>Esc</Text> {t('to cancel')}
        </Text>
      </Box>
    </Box>
  );
}
