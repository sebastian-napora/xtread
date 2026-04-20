/**
 * @license
 * Copyright 2025 Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useState } from 'react';
import type { Config } from '@xtread-code/xtread-core';
import type { ApiConfig } from '../../utils/systemKeys.js';

export interface UseApiSwitchResult {
  isApiSwitchDialogOpen: boolean;
  openApiSwitchDialog: () => void;
  closeApiSwitchDialog: () => void;
  switchToApi: (config: ApiConfig) => void;
}

export function useApiSwitch(config: Config | null): UseApiSwitchResult {
  const [isApiSwitchDialogOpen, setIsApiSwitchDialogOpen] = useState(false);

  const openApiSwitchDialog = useCallback(() => {
    setIsApiSwitchDialogOpen(true);
  }, []);

  const closeApiSwitchDialog = useCallback(() => {
    setIsApiSwitchDialogOpen(false);
  }, []);

  const switchToApi = useCallback(
    (cfg: ApiConfig) => {
      if (!config) return;
      config.updateCredentials({
        apiKey: cfg.apiKey,
        baseUrl: cfg.baseUrl,
        model: cfg.model,
      });
      setIsApiSwitchDialogOpen(false);
    },
    [config],
  );

  return {
    isApiSwitchDialogOpen,
    openApiSwitchDialog,
    closeApiSwitchDialog,
    switchToApi,
  };
}
