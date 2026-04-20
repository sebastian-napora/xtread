/**
 * @license
 * Copyright 2025 Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * QwenAuthState is kept for backward compatibility but is no longer used
 * since QWEN_OAUTH auth type has been removed.
 */
export interface QwenAuthState {
  deviceAuth: undefined;
  authStatus: 'idle';
  authMessage: '';
}

/**
 * useXtreadAuth hook is kept for backward compatibility but returns empty values
 * since QWEN_OAUTH auth type has been removed.
 */
export function useXtreadAuth(
  _pendingAuthType?: string,
  _isAuthenticating?: boolean,
): { qwenAuthState: QwenAuthState; cancelQwenAuth: undefined } {
  return {
    qwenAuthState: {
      deviceAuth: undefined,
      authStatus: 'idle',
      authMessage: '',
    },
    cancelQwenAuth: undefined,
  };
}